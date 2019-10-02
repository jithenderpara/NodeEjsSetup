
getClientinfo($("#leadid").val());
function IntroductionBind() {
  $(function() {
    if (clientdata) {
      //Introduction.html
      let data = clientdata;
      var _data2 = JSON.parse(clientdata.salesToolData);
      _data2 = JSON.parse(_data2);
      var termsUsed = JSON.parse(_data2["termsUsed"]);
      $("#todaydate").html(new Date().toDateString());
      $("#ApplicantName, #applicant_name strong").html(termsUsed.ApplicantName);
      $("#LawFirm, #law_firm strong").html(termsUsed.LawFirm);

      $("#Credircard .item").click(function() {
        $("#Credircard .item").removeClass("active");
        $("#Credircard .item").addClass("inactive");
        $(this).addClass("active visiteditem");
        sharescreen()
      });
    }
  });
}

  


//financial path
function loadCurrent_financial_path() {
  $(function() {
    var salesToolData = JSON.parse(clientdata.salesToolData);
    salesToolData = JSON.parse(salesToolData);
    var velocifyIncome = salesToolData.velocifyIncome;
    velocifyIncome = JSON.parse(velocifyIncome);

    var total = salesToolData.total;

    $("#current_bal").html(salesToolData.projectedPayOff.TotalUnsecuredDebt);
    $("#current_interestrate,#paypackinterestrate").html((parseFloat((salesToolData.projectedPayOff.InterestRate)).toFixed(0)+" %"));
    $("#current_payment").html(total.TotalPaymentDue);
    $("#pay_off_balance").html(salesToolData.projectedPayOff.ProjectedPayOff);
    $("#interest_paid").html(salesToolData.projectedPayOff.ExtraInterestPaid);
    // $("#total_amount_paid").html(salesToolData.projectedPayOff.ProjectedTotalPaid);
    var _total_amount_paid=removeCommas(salesToolData.projectedPayOff.TotalUnsecuredDebt.split("$")[1]) 
    + removeCommas(salesToolData.projectedPayOff.ExtraInterestPaid.split("$")[1])
     $("#total_amount_paid,#paybacktotalpaid").html("$"+
     numberWithCommas(
      _total_amount_paid.toFixed(0)
    )
    );
    $("#ficoScore").html(velocifyIncome["CreditData.FicoScore"]);
    TableAddCommas("currentbalanceTable")
  });
}
var Totalpayedtodate=0; //for "Pay Back What you Owe" slide
//termoptions
function loadtermoptions() {
  $(function() {
    var leadid = $("#leadid").val();

    var salesToolData = JSON.parse(clientdata.salesToolData);
    salesToolData = JSON.parse(salesToolData);
    var monthlyRates = salesToolData.monthlyRates;
    var Camt = salesToolData.total.TotalBalances;
    var _totalPaymentDue = salesToolData.total.TotalPaymentDue,
      rangeVal = 0;
      if (_totalPaymentDue) {
        _totalPaymentDue = _totalPaymentDue.split("$")[1];
        _totalPaymentDue = removeCommas(_totalPaymentDue);
        Totalpayedtodate=parseFloat(_totalPaymentDue);
      }
    var _CamtAmt=Camt.split("$")[1];
_CamtAmt=removeCommas(_CamtAmt);
    if(_CamtAmt<15000){
  $(".get15K_lowValue").show();
  $(".get15K_aboveValue").hide();
  $("#12monthlypayment").html(monthlyRates["MonthlyRates_monthly12"]);
  var _12payoff =(_totalPaymentDue - parseFloat(removeCommas(monthlyRates["MonthlyRates_monthly12"].split("$")[1]))).toFixed(1);
if(parseFloat(_12payoff)<0){
  _12payoff=_12payoff.toString();
  _12payoff=_12payoff.split("-")[1];
  }
  $("#12payoff").html(
    "$" +
      (_12payoff)
  );
  // $("#12payoff").html(monthlyRates["MonthlyRates_monthly24"]);
    }
    else{
      $(".get15K_lowValue").hide();
  $(".get15K_aboveValue").show();
    }

    $("#24monthlypayment").html(monthlyRates["MonthlyRates_monthly24"]);
    $("#36monthlypayment").html(monthlyRates["MonthlyRates_monthly36 "]);
    
   
    var _24payoff =(_totalPaymentDue - parseFloat(removeCommas(monthlyRates["MonthlyRates_monthly24"].split("$")[1]))).toFixed(1);
if(parseFloat(_24payoff)<0){
  _24payoff=_24payoff.toString();
  _24payoff=_24payoff.split("-")[1];
  }
  $("#24payoff").html(
    "$" +
      (_24payoff)
  );
  var payoff36=(_totalPaymentDue - parseFloat(removeCommas(monthlyRates["MonthlyRates_monthly36 "].split("$")[1]))).toFixed(0);
  if(parseFloat(payoff36)<0){
    payoff36=payoff36.toString();
    payoff36=payoff36.split("-")[1];
  }
    $("#36payoff").html(
      "$" +(payoff36)
    );

    //termmonthlypayment termpayoff
    
    //12months
    if (findAmount(monthlyRates["12Months_MaxTerms"], Camt)) {
      $("#paymentText, #termmonthlypayment").html(
        monthlyRates["MonthlyRates_monthly12"]
      );
      rangeVal = 1;
      $("#maxterm").html("12 Months");
      pacyback(rangeVal, 12)
    } 

    //24months
    else if
     (findAmount(monthlyRates["24Months_MaxTerms"], Camt)||_CamtAmt<15000) {
      $("#paymentText, #termmonthlypayment").html(
        monthlyRates["MonthlyRates_monthly24"]
      );
      rangeVal = 2;
      $("#maxterm").html("24 Months");
      pacyback(rangeVal, 24)
    } 
    
    //32months
    else if
    (findAmount(monthlyRates["32Months_MaxTerms"], Camt)) {
     $("#paymentText, #termmonthlypayment").html(
       monthlyRates["MonthlyRates_monthly32"]
     );
     rangeVal = 3;
     $("#maxterm").html("32 Months");
     pacyback(rangeVal, 32)
     }

//36months
    else if (
      findAmount(monthlyRates["36Months_MaxTerms"], Camt)
    ) {
      $("#paymentText, #termmonthlypayment").html(
        monthlyRates["MonthlyRates_monthly36"]
      );
      rangeVal = 4;
      $("#maxterm").html("36 Months");
      pacyback(rangeVal, 36)
    } 

//40months
    else if
    (
      findAmount(monthlyRates["40Months_MaxTerms"], Camt)) 
      {
     $("#paymentText, #termmonthlypayment").html(
       monthlyRates["MonthlyRates_monthly40"]
     );
     rangeVal = 5;
     $("#maxterm").html("40 Months");
     pacyback(rangeVal, 40)
     }   

//42months
    else if (findAmount(monthlyRates["42Months_MaxTerms"], Camt)) {
      $("#paymentText, #termmonthlypayment").html(
        monthlyRates["MonthlyRates_monthly42"]
      );
      rangeVal = 6;
      $("#maxterm").html("42 Months");
      pacyback(rangeVal, 42)
    }
    
    //48months
    else if (findAmount(monthlyRates["48Months_MaxTerms"], Camt)) {
      $("#paymentText, #termmonthlypayment").html(
        monthlyRates["MonthlyRates_monthly48"]
      );
      rangeVal = 7;
      $("#maxterm").html("48 Months");
      pacyback(rangeVal, 48)
    } 

//50months
    // else if (findAmount(monthlyRates["50Months_MaxTerms"], Camt)) {
    //   $("#paymentText, #termmonthlypayment").html(
    //     monthlyRates["MonthlyRates_monthly50"]
    //   );
    //   rangeVal = 8;
    //   $("#maxterm").html("50 Months");
    //   pacyback(rangeVal, 50)
    //   } 
      
     //52months 
    else if (findAmount(monthlyRates["52Months_MaxTerms"], Camt)) {
      $("#paymentText, #termmonthlypayment").html(
        monthlyRates["MonthlyRates_monthly52"]
      );
      rangeVal = 9;
      $("#maxterm").html("52 Months");
      pacyback(rangeVal, 52)
    }
    // else {
    // 	toastr.warning(data.message, { timeOut: 5000 })
    // }

    $("#payback_total").html(salesToolData.totalCost.Total)
    var maxtermpayoff = (_totalPaymentDue - (parseFloat(removeCommas($("#termmonthlypayment").text().split("$")[1]))).toFixed(3))
    if(parseFloat(maxtermpayoff)<0){maxtermpayoff=maxtermpayoff.toString();maxtermpayoff=maxtermpayoff.split("-")[1]}
    $("#termpayoff").html("$" + maxtermpayoff);
    $("#prograssbarinput").val(rangeVal);
    var range = [12, 24, 32, 36, 40, 42, 48, 50, 52],
      Input = "";
    if (rangeVal == 1) {
      range = [12];
    } else if (rangeVal == 2) {
      range = [12, 24];
    }
     else if (rangeVal == 3) {
      range = [12, 24, 32];
    }  
    else if (rangeVal == 4) {
      range = [12, 24, 32, 36];   
    } else if (rangeVal == 5) {
      range = [12, 24, 32, 36, 40];  
    }
      else if (rangeVal == 6) {
      range = [12, 24, 32, 36, 40, 42];
    }
    else if (rangeVal == 7) {
      range = [12, 24, 32, 36, 40, 42, 48];
    }
    else if (rangeVal == 8) {
      range = [12, 24, 32, 36, 40, 42, 48, 50];
    }
    else if (rangeVal == 9) {
      range = [12, 24, 32, 36, 40, 42, 48, 50, 52];
    }

    $("#prograssbar, #prograssbarother").html(Input);
    var table='',listwidth=30,activeitem;
    listwidth=430/range.length
  for (let index = 0; index < range.length; index++) {
    const element = range[index];
    if(rangeVal==index+1)
    {
activeitem='<span class="activeitem" style="background: #337ab7;position: absolute;top: -3px;width: 30px;height: 30px;margin-left: -11px;border-radius: 50%;">&nbsp;</sapn>'
    }
    else
    activeitem=''
    table+='<li class="stepitem" data-id="'+(index+1)+'" style="list-style-type: none;width:'+listwidth+'px;display: inline-block;text-align: center;">\
    <span style="position: absolute;top: 0;height: 40px;vertical-align: bottom;padding-top: 42px;">'+element+'</span>\
    <label class="" style="background: #337ab7;position: absolute;top: 8px;width: 2px;height: 29px;margin-left: 3px;">&nbsp;</label>'+activeitem+'\
    </li>'
    
  }
  $("#stepprogress, #stepprogressother").html(table)
$(".stepitem").click(function(){
  $(".activeitem").remove()
  var _activeitem='<span class="activeitem" style="background: #337ab7;position: absolute;top: -3px;width: 30px;height: 30px;margin-left: -11px;border-radius: 50%;">&nbsp;</sapn>'
  $(this).find(".activeitem").remove()
  $(this).append(_activeitem)
  var inpuVal = $(this).attr("data-id");
  if (inpuVal == 1) {
    $("#paymentText").html(monthlyRates["MonthlyRates_monthly12"]);
    pacyback(inpuVal, 12)

  } else if (inpuVal == 2) {
    $("#paymentText").html(monthlyRates["MonthlyRates_monthly24"]);
    pacyback(inpuVal, 24)
  }
  else if (inpuVal == 3) {
    $("#paymentText").html(monthlyRates["MonthlyRates_monthly32"]);
    pacyback(inpuVal, 32)
  }
  else if (inpuVal == 4) {
    $("#paymentText").html(monthlyRates["MonthlyRates_monthly36 "]);
    pacyback(inpuVal, 36)
  } 
  else if (inpuVal == 5) {
    $("#paymentText").html(monthlyRates["MonthlyRates_monthly40"]);
    pacyback(inpuVal, 40)
  }
  else if (inpuVal == 6) {
    $("#paymentText").html(monthlyRates["MonthlyRates_monthly42"]);
    pacyback(inpuVal, 42)

  } else if (inpuVal == 7) {
    $("#paymentText").html(monthlyRates["MonthlyRates_monthly48"]);
    pacyback(inpuVal, 48)
  } 
  else if (inpuVal == 8) {
    $("#paymentText").html(monthlyRates["MonthlyRates_monthly50"]);
    pacyback(inpuVal, 50)
  }
  else if (inpuVal == 9) {
    $("#paymentText").html(monthlyRates["MonthlyRates_monthly52"]);
    pacyback(inpuVal, 52)
  }
  sharescreen()
});
    $(".slider .tooltip-inner").hide();

    $("#prograssbar .slider-horizontal").css({ width: "400px !important" });
    $("#prograssbar .slider-tick-label").css({ width: "133 !important" });
    TableAddCommas("term-optiontabale") 
    if(parseFloat((_totalPaymentDue - parseFloat(removeCommas(monthlyRates["MonthlyRates_monthly24"].split
    ("$")[1]))).toFixed(1))<0)
    {
    $("#24payoff").html("<span>(" + $("#24payoff").text()+")</span>");
    }
    if(
      (_totalPaymentDue - parseFloat(removeCommas(monthlyRates["MonthlyRates_monthly36 "].split("$")[1]))).toFixed(0)<0
    ){
      $("#36payoff").html("<span>(" + $("#36payoff").text()+")</span>")
    }
    if((_totalPaymentDue - (parseFloat(removeCommas($("#termmonthlypayment").text().split("$")[1]))).toFixed(0))<0){
      $("#termpayoff").html("<span>(" + $("#termpayoff").text()+")</span>")
    }
    if(monthlyRates["MonthlyRates_monthly24"]<0){
      $("#24monthlypayment").html(monthlyRates["MonthlyRates_monthly24"])
    }else{
        $("#24monthlypayment").html(monthlyRates["MonthlyRates_monthly24"]);
      }

    
  });

  
  function findAmount(amountInstring, Compare_amount) {
    console.log(amountInstring);
    if (amountInstring != "" && amountInstring != "N/A" && amountInstring) {
      Compare_amount = parseFloat(Compare_amount.split("$")[1]);
      var _amountInstring = amountInstring.split("$")[1];
      var _amount = _amountInstring.split("-")[0];
      var minAmt = _amount.split("k")[0];
      var maxAmt = 0;
      if (amountInstring == "$50k-Plus") {
        maxAmt = 0;
        return true;
      } else {
        maxAmt = amountInstring.split("-$")[1].split("k")[0];
      }
      if (minAmt) {
        minAmt = parseFloat(minAmt);
      }
      if (maxAmt) {
        maxAmt = parseFloat(maxAmt);
      }
      if (Compare_amount >= minAmt && Compare_amount <maxAmt) {
        return true;
      } else return false;
    } else return false;
  }
}
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
//summary
function LoadSummary() {
  $(function() {
    if (clientdata) {
      // debugger;
      var salesToolData = JSON.parse(clientdata.salesToolData);
      salesToolData = JSON.parse(salesToolData);
      var velocifyIncome = salesToolData.velocifyIncome;
      velocifyIncome = JSON.parse(velocifyIncome);
    }

    var total = salesToolData.total;
    var Total = salesToolData.totalCost.Total;
   
    //current situation
    
    $("#projectedPayOff, #projectedPayOff_Saving").html(salesToolData.projectedPayOff.ProjectedPayOff);
    $("#projectedTotalPaid, #projectedTotalPaid_Saving").html(
      salesToolData.projectedPayOff.ProjectedTotalPaid
    );
    $("#totalPaymentDue, #totalPaymentDue_Saving,#paybacktotalPaymentDue").html(total.TotalPaymentDue);
    
    //proposed terms
    
    $("#totalcost, #totalcost_Saving").html(salesToolData.totalCost.Total);
    var monthlyRates = salesToolData.monthlyRates;
    var Camt = salesToolData.total.TotalBalances;
    var _camt=Camt.split("$")[1];
    _camt=removeCommas(_camt)
    if (findAmount(monthlyRates["12Months_MaxTerms"], Camt)) {
      $("#monthlyprop,#monthlyprop_Saving").html(monthlyRates["MonthlyRates_monthly12"]);
      $("#timetopayoffprop, #timetopayoffprop_Saving").html("1 Year");
    } else if (findAmount(monthlyRates["24Months_MaxTerms"], Camt) || _camt<15000) {
      $("#monthlyprop, #monthlyprop_Saving").html(monthlyRates["MonthlyRates_monthly24"]);
      $("#timetopayoffprop, #timetopayoffprop_Saving").html("2 Yrs");
    } 
    else if (findAmount(monthlyRates["32Months_MaxTerms"], Camt)) {
      $("#monthlyprop, #monthlyprop_Saving").html(monthlyRates["MonthlyRates_monthly32"]);
      $("#timetopayoffprop, #timetopayoffprop_Saving").html("2.8Yrs");
    } 
    else if (
      findAmount(salesToolData.monthlyRates["36Months_MaxTerms"], Camt)
    ) {
      $("#monthlyprop, #monthlyprop_Saving").html(monthlyRates["MonthlyRates_monthly36"]);
      $("#timetopayoffprop, #timetopayoffprop_Saving").html("3Yrs");
    } 
    // else if (
    //   findAmount(salesToolData.monthlyRates["40Months_MaxTerms   "], Camt)
    // ) {
    //   $("#monthlyprop, #monthlyprop_Saving").html(monthlyRates["MonthlyRates_monthly40"]);
    //   $("#timetopayoffprop, #timetopayoffprop_Saving").html("3.4Yrs");
    // } 
    
    else if (findAmount(monthlyRates["42Months_MaxTerms"], Camt)) {
      $("#monthlyprop, #monthlyprop_Saving").html(monthlyRates["MonthlyRates_monthly42"]);
      $("#timetopayoffprop, #timetopayoffprop_Saving").html("3.6Yrs");
    }
    
    
    
    else if (findAmount(monthlyRates["48Months_MaxTerms"], Camt)) {
      $("#monthlyprop, #monthlyprop_Saving").html(monthlyRates["MonthlyRates_monthly48"]);
      $("#timetopayoffprop, #timetopayoffprop_Saving").html("4Yrs");
    } 
    
    // else if (findAmount(monthlyRates["50Months_MaxTerms"], Camt)) {
    //   $("#monthlyprop, #monthlyprop_Saving").html(monthlyRates["MonthlyRates_monthly50"]);
    //   $("#timetopayoffprop, #timetopayoffprop_Saving").html("4.2Yrs");
    // }
    else if (findAmount(monthlyRates["52Months_MaxTerms"], Camt)) {
      $("#monthlyprop, #monthlyprop_Saving").html(monthlyRates["MonthlyRates_monthly52"]);
      $("#timetopayoffprop, #timetopayoffprop_Saving").html("4.4Yrs");
    }
    //savings
    $("#timetopayoffsavings, #timetopayoffsavings_Saving").html(
      (removeCommas($("#projectedPayOff, #projectedPayOff_Saving").text().split("Yrs")[0]) 
      -
        removeCommas($("#timetopayoffprop, #timetopayoffprop_Saving").text().split("Yrs")[0])).toFixed(2) 
        +"Yrs");
        
    $("#totalpaysavings, #totalpaysavings_Saving").html(
      "$" +
        (removeCommas(
          $("#projectedTotalPaid, #projectedTotalPaid_Saving")
            .text()
            .split("$")[1]
        ) -
          removeCommas(
            $("#totalcost, #totalcost_Saving")
              .text()
              .split("$")[1]
          )).toFixed(0)
    );
    $("#monthlypaysavings, #monthlypaysavings_Saving, #monthlypaysavings_Saving_span").html(
      "$" +
        (removeCommas(
          $("#totalPaymentDue")
            .text()
            .split("$")[1]
        ) -
          removeCommas(
            $("#monthlyprop")
              .text()
              .split("$")[1]
          )).toFixed(0)
    );
    TableAddCommas("summaryTable")
    TableAddCommas("summaryTable_Saving")
    addCommas("monthlypaysavings_Saving_span")
   $("#totalpaysavings_span").html($("#totalpaysavings_Saving").text())
    
   Funclient_savings();
  });
function  RemoveComma(numberStr){
  return parseFloat(numberStr.replace(/,/g, ""));
}
  function findAmount(amountInstring, Compare_amount) {
    console.log(amountInstring);
    if (amountInstring != "" && amountInstring != "N/A" && amountInstring) {
      Compare_amount = parseFloat(Compare_amount.split("$")[1]);
      var _amountInstring = amountInstring.split("$")[1];
      var _amount = _amountInstring.split("-")[0];
      var minAmt = _amount.split("k")[0];
      var maxAmt = 0;
      if (amountInstring == "$50k-Plus") {
        maxAmt = 0;
        return true;
      } else {
        maxAmt = amountInstring.split("-$")[1].split("k")[0];
      }
      if (minAmt) {
        minAmt = parseFloat(minAmt);
      }
      if (maxAmt) {
        maxAmt = parseFloat(maxAmt);
      }
      if (Compare_amount >= minAmt && Compare_amount < maxAmt) {
        return true;
      } else return false;
    } else return false;
  }
}
//program conditions
function loadprogram_conditions() {
  $(function() {
    $("#programCondition .item").addClass(function() {
      $("#programCondition .item").removeClass("active");
      $("#programCondition .item").addClass("active");
      $(this).addClass("active");
      setTimeout(function(){
        sharescreen()
      },300)
     
    });
  });
}
//credit card mod
function LoadModifications(){
  $("#Modification .item").click(function(){
    $("#Modification .item").removeClass("active")
     $("#Modification .item").addClass("inactive")
    $(this).addClass("active visiteditem")
    sharescreen()
  })
}
//road map
function loadroadmap() {
  $(function() {
    $("#RoadMap .item").click(function() {
      var _id=$(this).attr("data-id")
      $("#RoadMap .item.active,#RoadMap .daytext.active").addClass("visited")
      $("#RoadMap .item,#RoadMap .daytext").removeClass("active");
      $("#RoadMap .item").addClass("inactive");
      $("#RoadMap #"+_id).addClass("active");
      $(this).addClass("active");
      sharescreen()
    });
  });
}
//financial goals
function loadyourFinancialGoals() {
  $(function() {
    var _goals = [
      {
        ReturnedName: "You would like to take a vacation",
        MapTo: "Youwouldliketotakeavacation"
      },
      { ReturnedName: "You want to buy a car", MapTo: "Youwanttobuyacar" },
      {
        ReturnedName: "You want to help a loved one",
        MapTo: "Youwanttohelpalovedone"
      },
      {
        ReturnedName:
          "You would like to make some home improvements / renovations",
        MapTo: "Youwouldliketomakesomehomeimprovementsrenovations"
      },
      {
        ReturnedName: "You would like to upgrade your living situation",
        MapTo: "Youwouldliketoupgradeyourlivingsituation"
      },
      {
        ReturnedName: "You would like to use the money to invest",
        MapTo: "Youwouldliketousethemoneytoinvest"
      },
      {
        ReturnedName: "You want monthly payment relief",
        MapTo: "Youwantmonthlypaymentrelief"
      },
      {
        ReturnedName: "You want to get out of debt faster",
        MapTo: "Youwanttogetoutofdebtfaster"
      },
      {
        ReturnedName: "You would like to lower your interest rates",
        MapTo: "Youwouldliketoloweryourinterestrates"
      },
      {
        ReturnedName: "You want to stop living paycheck to paycheck",
        MapTo: "Youwanttostoplivingpaychecktopaycheck"
      },
      {
        ReturnedName: "Save money for retirement",
        MapTo: "Savemoneyforretirement"
      },
      {
        ReturnedName: "Put money away for your child's education",
        MapTo: "Putmoneyawayforyourchildseducation"
      },
      {
        ReturnedName: "Save money for unexpected expenses",
        MapTo: "Savemoneyforunexpectedexpenses"
      },
      { ReturnedName: "Unspecified Goal", MapTo: "UnspecifiedGoal" }
    ];
    var clientInfo = JSON.parse(clientdata.salesToolData);
    clientInfo = JSON.parse(clientInfo);
    var _keyareasdata_velocify = clientInfo.velocifyIncome;

    _keyareasdata_velocify = JSON.parse(_keyareasdata_velocify);
    _keyareasdata = JSON.parse(_keyareasdata_velocify.ApplicantScoring);
    console.log(_keyareasdata_velocify.Youwouldliketotakeavacation);
    var getgoals = _keyareasdata_velocify;
    // debugger;
    var gcount = 0;
    var _goalsList = "";
    if (_goals.length > 0) {
      for (let index = 0; index < _goals.length; index++) {
        var _mapvalue = _goals[index].MapTo;
        if (getgoals[_mapvalue] == "True") {
          _goalsList += "<li>" + _goals[index].ReturnedName + "</li>";
          gcount++;
        }
      }
      if (getgoals.UnspecifiedGoal != "") {
        _goalsList += "<li>" + getgoals.UnspecifiedGoal + "</li>";
      }
      $("#clientgoals").html(_goalsList);
    } else {
      $("#nogoals").show();
    }
    if (gcount <= 0) {
      $("#nogoals").show();
    }
    if (_keyareasdata.length > 0) {
      var keyarealist = "";
      for (let index = 0; index < _keyareasdata.length; index++) {
        const element = _keyareasdata[index];
        if(element.indexOf("Score Model: FICO CLASSIC")!=0)
        keyarealist += "<li>" + element + "</li>";
      }
      $("#keyareas").html(keyarealist);
    } else {
      $("#nokeyarea").show();
    }
  });
}
//your analysis
function loadyouranalysis() {
  $(function() {
    if (clientdata) {
      // debugger;
     
      var salesToolData = JSON.parse(clientdata.salesToolData);
      salesToolData = JSON.parse(salesToolData);
      var velocifyIncome = salesToolData.velocifyIncome;
      velocifyIncome = JSON.parse(velocifyIncome);
      var total = salesToolData.total;
      salesToolData = JSON.parse(salesToolData.clientData);
      console.log(velocifyIncome);
      
      var _HouseholdIncome = parseFloat(velocifyIncome.HouseholdIncome) / 12,
        cashflow = 0,
        stateddti = 0;
      HouseholdIncome = 0;

      cashflow =
        parseFloat(removeCommas(velocifyIncome.HouseholdIncome)) / 12 -
        (parseFloat(removeCommas(velocifyIncome.ApplicantMonthlyExpenses)));
      stateddti =
        parseInt(removeCommas(velocifyIncome.ApplicantMonthlyExpenses)) /
        parseFloat(removeCommas(velocifyIncome.HouseholdIncome) / 12);
      stateddti = parseFloat((stateddti).toFixed(2));
      $("#income").html("$ " + _HouseholdIncome.toFixed(0));
      $("#expenses").html("$ " + velocifyIncome.ApplicantMonthlyExpenses);
      $("#cashflow").html("$ " + cashflow.toFixed(3));
      
      
      $("#stateddti").html((stateddti * 100).toFixed(0) + "%");
      $("#total_debt, #total_debt_saving").html(total.TotalBalances);
      $("#total, #paybacktotal").html(total.TotalBalances);
      $("#total_payments").html(total.TotalPaymentDue);
      $("#creditor").html(clientdata.salesToolData.Creditor);
      var Creditor = JSON.parse(clientdata.tradelinedata);
      var _tableTr = "";
      for (let index = 0; index < Creditor.length; index++) {
        if(Creditor[index].isChecked){
        _tableTr +=
          "<tr><td style='background:#ccc;text-align:left;color: black;border-bottom: 1px solid #fff;padding: .75rem;vertical-align: top;'>" +
          Creditor[index].Creditor +
          "</td>\
<td  style='background:#ccc;text-align:right;color: black;border-bottom: 1px solid #fff;padding: .75rem;\
vertical-align: top;'>" +
          Creditor[index].Balance +
          "</td></tr>";
        }
      }
      $("#tablebindfoot").html(
        '<tr style=" text-align: left;color:#1c4889; font-size:20px;border-bottom:2px solid #1c4889;">\
                    <th  style="text-align:left;color: black;border-bottom: 1px solid #fff;padding: .75rem;\
                    vertical-align: top;">TOTAL</th>\
                    <th style="text-align:right;color: black;border-bottom: 1px solid #fff;padding: .75rem;\
                    vertical-align: top;" id ="total">' +
        total.TotalBalances +
        '</th>\
                  </tr>\
                  <tr style="text-align: left;color:#1c4889; font-size:20px;display:none">\
                      <th >Total Payments</th>\
                      <th id ="total_payments">' +
        total.TotalPaymentDue +
        '</th>\
                    </tr>');
      $("#tablebind").html(_tableTr);
      $("#tablebind").scroll(function(evt) {
        var $Position = {
          top:evt.target.scrollTop,
          name: clientId,
          divId:"#tablebind"
        }
        // console.log($Position)
        socket.emit("divScrolling",$Position );       
      });
      
    }
    TableAddCommas("analysistableBind")
    TableAddCommas("monthlyincometable")
    if(parseFloat(cashflow)<0){
      $("#cashflow").css("background","red");
      $("#cashflow").html("<span>(" + $("#cashflow").text()+")</span>");
    }
    // addCommas("monthlypaysavings")
    // addCommas("totalpaysavings")
  });
  
  
}

//payback
function pacyback(slideval,termval){
  if(termval){
    var _paybackterm=termval //.split("$")[1];
    if(_paybackterm)
    {
      
      _paybackterm=parseFloat(removeCommas(_paybackterm));
     $("#paybacktotalpaidtodateval").html("$"+Totalpayedtodate*_paybackterm);
      addCommas("paybacktotalpaidtodateval")
    }    
    ;
  }
};


//client-savings

 function Funclient_savings(){

//  client_savings=parseFloat(removeCommas(client_savings));

var _annuaval=(removeCommas($("#totalpaysavings_Saving").text().split("$")[1])/parseFloat($("#maxterm").text().split(" ")[0]))*12;
_annuaval=_annuaval.toFixed(3);
$("#annual_savings").html("$ "+_annuaval);
addCommas("annual_savings")

 }