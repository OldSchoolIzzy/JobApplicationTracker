function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function sortNumber(n) {
  var table, rows, switching, i, x, y, shouldSwitch, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  dir = "asc";

  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      x = x.innerHTML.split('$').join('').split(',').join('')
      y = y.innerHTML.split('$').join('').split(',').join('')
      if (dir == "asc"){
       //check if the two rows should switch place:
        if (Number(x) > Number(y)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }else if (dir == "desc") {
        if (Number(x) < Number(y)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    }else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// ToDo: Figure out how to sort status and interest level
function sortStatuses(n) {
  var table, rows, switching, i, x, y, shouldSwitch, switchcount = 0;
  let xValue = 0, yValue = 0

  table = document.getElementById("myTable");
  switching = true;
  dir = "asc";

  const statuses = new Map()
  statuses.set('Accepted', 1)
  statuses.set('Pending', 2)
  statuses.set('Rejected', 3)

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      x = x.innerHTML
      y = y.innerHTML

      xValue = statuses.get(x)
      yValue = statuses.get(y)

      console.log(xValue)
      console.log(yValue)

      if (dir == "asc"){
        if (Number(xValue) > Number(yValue)) {
          shouldSwitch = true;
          break;
        }
      }else if (dir == "desc") {
        if (Number(xValue) < Number(yValue)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    }else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function sortInterestLevels(n) {
  var table, rows, switching, i, x, y, shouldSwitch, switchcount = 0;
  let xValue = 0, yValue = 0

  table = document.getElementById("myTable");
  switching = true;
  dir = "asc";

  const statuses = new Map()
  statuses.set('Low', 1)
  statuses.set('Medium', 2)
  statuses.set('High', 3)

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      x = x.innerHTML
      y = y.innerHTML

      xValue = statuses.get(x)
      yValue = statuses.get(y)

      console.log(xValue)
      console.log(yValue)

      if (dir == "asc"){
        if (Number(xValue) > Number(yValue)) {
          shouldSwitch = true;
          break;
        }
      }else if (dir == "desc") {
        if (Number(xValue) < Number(yValue)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    }else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}