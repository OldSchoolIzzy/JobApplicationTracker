import pytest

from JobApplication.db import get_db


def test_index(client, auth):
    response = client.get("/")
    assert b"Log In" in response.data
    assert b"Register" in response.data

    auth.login()
    response = client.get("/auth/applications")
    assert b"Log Out" in response.data
    assert b"Pending" in response.data
    assert b"hello world" in response.data
    assert b"Software Engineer" in response.data
    assert b"2018-01-01" in response.data
    # ToDo: Figure out why 100000 is not being found
    # assert b'100000' in response.data
    assert b"SpaceX" in response.data
    assert b"High" in response.data
    assert b"First Round" in response.data
    assert b"Website" in response.data
    assert b'href="/1/update"' in response.data


@pytest.mark.parametrize("path", ("/create", "/1/update", "/1/delete"))
def test_login_required(client, path):
    response = client.post(path)
    assert response.headers["Location"] == "/auth/login"


def test_author_required(app, client, auth):
    # change the post author to another user
    with app.app_context():
        db = get_db()
        db.execute("UPDATE application SET author_id = 2 WHERE id = 1")
        db.commit()

    auth.login()
    # current user can't modify other user's post
    assert client.post("/1/update").status_code == 403
    assert client.post("/1/delete").status_code == 403
    # current user doesn't see edit link
    assert b'href="/1/update"' not in client.get("/").data


@pytest.mark.parametrize("path", ("/2/update", "/2/delete"))
def test_exists_required(client, auth, path):
    auth.login()
    assert client.post(path).status_code == 404


def test_create(client, auth, app):
    auth.login()
    assert client.get("/create").status_code == 200
    client.post("/create", data={"companyName": "created",
                                 "note": "this worked",
                                 "jobTitle": "something",
                                 "status": "Rejected",
                                 "interestLevel": "High",
                                 "salary": 100000,
                                 "stage": "last round",
                                 "website": "youtube.com"
                                 })

    with app.app_context():
        db = get_db()
        count = db.execute("SELECT COUNT(id) FROM application").fetchone()[0]
        assert count == 2


def test_update(client, auth, app):
    auth.login()
    assert client.get("/1/update").status_code == 200
    client.post("/1/update", data={"status": "Pending", "note": "none",
                                   "interestLevel": "Low",
                                   "stage": "First round"})

    with app.app_context():
        db = get_db()
        application = db.execute("SELECT * FROM application WHERE id = 1").fetchone()
        assert application["job_title"] == "Software Engineer"


# ToDo: Figure out how to make this test work
# @pytest.mark.parametrize("path", ("/create", "/1/update"))
# def test_create_update_validate(client, auth, path):
#     auth.login()
#     response = client.post(path, data={"title": "", "body": ""})
#     assert b"Title is required." in response.data



def test_delete(client, auth, app):
    auth.login()
    response = client.post("/1/delete")
    assert response.headers["Location"] == "/auth/applications"

    with app.app_context():
        db = get_db()
        post = db.execute("SELECT * FROM application WHERE id = 1").fetchone()
        assert post is None