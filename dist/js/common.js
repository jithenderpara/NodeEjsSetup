function DoAjaxCall(params, MethodName, MethodType, isSynch, callback) {
  if (isSynch) {
    $("#loading").html(
      '<div class="ajaxLoading" style="background: #19191961;position: fixed;\
    height: 100%;width: 100%;top: 0;left:0">\
  <img src="/images/spinner.gif" style="position: fixed;top: 45%;left: 45%;width: 100px;height: 100px"></div><div class="ajaxFade"></div>'
    );
  } else {
    $("#loading").html("");
  }
  $.ajax({
    type: MethodType,
    contentType: "application/json; charset=utf-8",
    url: "/api/" + MethodName + "",
    data: JSON.stringify(params),
    dataType: "json",
    cache: false,
    async: true,
    success: function(data) {
      $("#loading").html("");
      callback(data);
    },
    error: function(err) {
      alert("Oops! Something went wrong. Try again later.");
      //console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
      $("#loading").html("");
    }
  });
}
function removeCommas(str) {
  if(typeof(str)=="number")
  str=str.toString();
  while (str.search(",") >= 0) {
    str = (str + "").replace(",", "");
  }
  return parseFloat(str);
}
function addCommas(eleId) {
  var _element = document.getElementById(eleId);
  if (_element) {
    str = _element.innerText;
    if (str != "") {
      var IgnoreChar = ["$", "Yrs"];
      if (str.indexOf("$") > -1) {
        str = str.split("$")[1];
        var isValid = /^[0-9,.]*$/.test(str);
        if (isValid || !isNaN(str)||parseInt(str)) {
          _element.innerText =
          "$" + numberWithCommas(parseFloat(removeCommas(str)));
        }
      } else if (str.indexOf("Yrs") > -1) {
        str = str.split("Yrs")[0];
        var isValid = /^[0-9,.]*$/.test(str);
        if (isValid || !isNaN(str)) {
          if (_element.getAttribute("data-ignore") != "false") {
            numberWithCommas(parseFloat(removeCommas(str)).toFixed(0)) +
            " Yrs";
          }
        }
      } else {
        var isValid = /^[0-9,.]*$/.test(str);
        if (isValid || !isNaN(str)) {
          if (_element.getAttribute("data-is-decimal") != "false")
            _element.innerText = numberWithCommas(
              parseFloat(removeCommas(str)).toFixed(0)
            );
          else _element.innerText = numberWithCommas(parseFloat(removeCommas(str)));
        }
      }
    }
  }
}
function TableAddCommas(tableId) {
  var table = document.getElementById(tableId),
    rows = table.rows,
    rowcount = rows.length,
    r,
    cells,
    cellcount,
    c,
    cell;
  var _symbol = "";
  for (r = 0; r < rowcount; r++) {
    cells = rows[r].cells;
    cellcount = cells.length;
    for (c = 0; c < cellcount; c++) {
      cell = cells[c];
      // console.log(cell.innerText)
      str = cell.innerText;
      if (str != "") {
        var IgnoreChar = ["$", "Yrs"];
        if (str.indexOf("$") > -1) {
          str = str.split("$")[1];
          var isValid = /^[0-9,.]*$/.test(str);
          if (isValid || !isNaN(str)) {
            if (cell.getAttribute("data-ignore") != "false") {
              if (cell.getAttribute("data-is-decimal") != "false")
                cell.innerText =
                  "$" +
                  numberWithCommas(parseFloat(removeCommas(str).toFixed(0)));
              else
                cell.innerText =
                  "$" + numberWithCommas(parseFloat(removeCommas(str)));
            }
          }
        } else if (str.indexOf("Yrs") > -1) {
          str = str.split("Yrs")[0];
          var isValid = /^[0-9,.]*$/.test(str);
          if (isValid || !isNaN(str)) {
            if (cell.getAttribute("data-ignore") != "false") {
              if (cell.getAttribute("data-is-decimal") != "false")
                cell.innerText =
                  numberWithCommas(parseFloat(removeCommas(str)).toFixed(0)) +
                  " Yrs";
              else
                cell.innerText =
                  numberWithCommas(parseFloat(removeCommas(str))) + " Yrs";
            }
          }
        } else {
          var isValid = /^[0-9,.]*$/.test(str);
          if (isValid || !isNaN(str)) {
            if (cell.getAttribute("data-is-decimal") != "false")
              cell.innerText = numberWithCommas(
                parseFloat(removeCommas(str)).toFixed(0)
              );
            else
              cell.innerText = numberWithCommas(parseFloat(removeCommas(str)));
          }
        }
      }
      // now do something.
    }
  }
}
function parseNumberCustom(number_string) {
  var new_number = parseInt(
    number_string.indexOf(",") >= 3
      ? number_string.split(",")[0]
      : number_string.replace(/[^0-9\.]/g, "")
  );
  console.log("Before==>" + number_string + ", After==>" + new_number);
}
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
$(function() {
  var links = $("#menuLinks a");
  $(links).removeClass("active");
  for (let index = 0; index < links.length; index++) {
    const element = links[index];
    $(element).addClass("active");
  }
});
