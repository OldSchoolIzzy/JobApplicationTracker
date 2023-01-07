from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, session
)


from werkzeug.exceptions import abort


from JobApplication.auth import login_required
from JobApplication.db import get_db


bp = Blueprint('application', __name__)


@bp.route('/')
def index():
    return render_template('base.html')


@bp.route('/auth/applications')
@login_required
def application():
    db = get_db()
    user_id = session.get('user_id')

    applications = db.execute(
        ' SELECT * '
        ' FROM application '
        ' where author_id = ? '
        ' ORDER BY date_applied DESC ', (user_id,)
    ).fetchall()
    return render_template('application/index.html', applications=applications)


@bp.route('/create', methods=('GET', 'POST'))
@login_required
def create():
    if request.method == 'POST':
        companyName = request.form['companyName']
        jobTitle = request.form['jobTitle']
        status = request.form.get('status')
        interestLevel = request.form.get('interestLevel')
        salary = request.form['salary']
        stage = request.form['stage']
        website = request.form['website']
        note = request.form['note']
        error = None

        if not companyName:
            error = 'Company name is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'INSERT INTO application (company_name, job_title, status, interest_level, salary, stage, website, note, author_id)'
                ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                (companyName, jobTitle, status, interestLevel, salary, stage, website, note, g.user['id'])
            )
            db.commit()
            return redirect(url_for('application.application'))

    return render_template('application/create.html',
                           data=[{'name':'Low'}, {'name': 'Medium'}, {'name':'High'}],
                           status=[{'status': 'Pending'}, {'status': 'Accepted'}, {'status': 'Rejected'}])


def get_application(id, check_author=True):
    application = get_db().execute(
        'SELECT *'
        ' FROM application a JOIN user u ON a.author_id = u.id'
        ' WHERE a.id = ?',
        (id,)
    ).fetchone()

    if application is None:
        abort(404, f"Application id {id} doesn't exist.")

    if check_author and application['author_id'] != g.user['id']:
        abort(403)

    return application


@bp.route('/<int:id>/update', methods=('GET', 'POST'))
@login_required
def update(id):
    application = get_application(id)

    if request.method == 'POST':
        status = request.form.get('status')
        interestLevel = request.form.get('interestLevel')
        stage = request.form['stage']
        note = request.form['note']
        error = None

        if not status:
            error = 'Status is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'UPDATE application SET status = ?, interest_level = ?, stage = ?, note = ?'
                ' WHERE id = ?',
                (status, interestLevel, stage, note, id)
            )
            db.commit()
            return redirect(url_for('application.application'))

    return render_template('application/update.html', application=application,
                           status=[{'status': 'Pending'}, {'status': 'Accepted'}, {'status': 'Rejected'}],
                           data=[{'name': 'Low'}, {'name': 'Medium'}, {'name': 'High'}]
                           )


@bp.route('/<int:id>/delete', methods=('POST',))
@login_required
def delete(id):
    get_application(id)
    db = get_db()
    db.execute('DELETE FROM application WHERE id = ?', (id,))
    db.commit()
    return redirect(url_for('application.application'))