$(function () {

    const investCurrency = document.querySelector('.investment-currency');
    const currencyItems = document.querySelectorAll('.radio-box');
    const investValue = document.querySelector('.investment-value');
    const profitPercentValue = document.querySelector('.profit-percent-value');
    const userInvest = document.getElementById('you-invested');
    const userGet = document.getElementById('you-get');
    const investRateValue = document.querySelector('.interest-rate__value-percent');
    const profitValue = document.querySelector('.profit-value');

    let appData = {};

    const interestRates = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.75];

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // from January to December

    const investmentStartInput = document.querySelector('#investment-start');
    const investmentEndInput = document.querySelector('#investment-end');
    let investmentStartDate = new Date('2021-01-01');
    let investmentStartYear = investmentStartDate.getFullYear();
    //console.log(investmentStartYear);
    let investmentStartMonth = investmentStartDate.getMonth() + 1;
    //console.log(investmentStartMonth);
    let investmentStartDay = investmentStartDate.getDate();
    //console.log(investmentStartDay);
    investmentStartInput.value = `${investmentStartYear}-0${investmentStartMonth}-0${investmentStartDay}`;


    let investmentEndDate;
    let investmentEndYear;
    let investmentEndMonth;
    let investmentEndDay;
    

    var $term_range = $("#investment-term");
    var minMonth = 1;
    var maxMonth = 11;
    $term_range.ionRangeSlider({
        grid: true,
        grid_num: 11,
        grid_snap: true,
        min: minMonth,
        max: maxMonth,
        //from: 3,
        step: 1,
        onChange: function (data) {
            var term_slider = $term_range.data("ionRangeSlider");
            var investTermVal = term_slider.result.from;
            currentRate = interestRates[investTermVal - 1];
            appData.term = investTermVal;
            appData.percent = interestRates[investTermVal - 1];
            investRateValue.textContent = `${appData.percent}%`;
            getEndDate();
            calcPercent();
            updateInputs();

            appData.investment = amount_slider.result.from;
            investVal = `${appData.investment.toFixed(3).replace(".", ",")} ${appData.currency}`;
            userInvest.textContent = investVal;
            investValue.textContent = investVal;
            appData.get = (appData.investment * profitPercent) / 100 + appData.investment;
            userGet.textContent = `${appData.get.toFixed(3).replace(".", ",")} ${appData.currency}`;
            appData.profit = appData.get - appData.investment;
            profitPercentValue.textContent = `${profitPercent} %`;
            profitValue.textContent = `${appData.profit.toFixed(3).replace(".", ",")} ${appData.currency}`;
            console.log(appData);
        }
    });
    var term_slider = $term_range.data("ionRangeSlider");
    var investTermVal = term_slider.result.from;
    //console.log(investTermVal);
    appData.term = investTermVal;
    appData.percent = interestRates[investTermVal - 1];
    investRateValue.textContent = `${appData.percent}%`;


    currentRate = interestRates[investTermVal - 1];
    let profitPercent;

    function calcPercent() {
        getEndDate();
        let currentMonths = [];
        for (let i = investmentStartMonth - 1; i < investmentEndMonth - 1; i++) {
            currentMonths.push(daysInMonth[i]);
        }
        //console.log(currentMonths);
        profitPercent = currentMonths.map(item => item * currentRate).reduce((sum, current) => sum + current);
        profitPercentValue.textContent = `${profitPercent} %`;
        //console.log(profitPercent);
    }
    calcPercent();
    

    for (let i = 0; i < currencyItems.length; i++) {
        if (currencyItems[i].checked) {
            appData.currency = currencyItems[i].value;
            investCurrency.textContent = `${appData.currency}`;
        }
        currencyItems[i].addEventListener('input', () => {
            if (currencyItems[i].checked) {
                appData.currency = currencyItems[i].value;
                console.log(appData);
                updateInputs();
                investCurrency.textContent = `${appData.currency}`;
            }
        });
        currencyItems[i].addEventListener('change', () => {
            if (currencyItems[i].checked) {
                appData.currency = currencyItems[i].value;
                console.log(appData);
                updateInputs();
                investCurrency.textContent = `${appData.currency}`;
            }
        });
    }

    var $amount_range = $("#investment-amount");
    var $input = $(".investment-sum-input");
    var min = 0;
    var max = 40;

    $amount_range.ionRangeSlider({
        min: min,
        max: max,
        from: 10,
        onStart: function (data) {
            $input.prop("value", `${data.from.toFixed(3).replace(".", ",")}`);
            var $inp = $(this);
            var from = $inp.data("from");
            appData.investment = data.from;
            investVal = `${appData.investment.toFixed(3).replace(".", ",")} ${appData.currency}`;
            userInvest.textContent = investVal;
            investValue.textContent = investVal;
            appData.get = (appData.investment * profitPercent) / 100 + appData.investment;
            userGet.textContent = `${appData.get.toFixed(3).replace(".", ",")} ${appData.currency}`;
            appData.profit = appData.get - appData.investment;
            profitPercentValue.textContent = `${profitPercent} %`;
            profitValue.textContent = `${appData.profit.toFixed(3).replace(".", ",")} ${appData.currency}`;
            console.log(appData);
            calcPercent();
        },
        onChange: function (data) {
            $input.prop("value", `${data.from.toFixed(3).replace(".", ",")}`);
            var $inp = $(this);
            var from = $inp.data("from");
            appData.investment = data.from;
            investVal = `${appData.investment.toFixed(3).replace(".", ",")} ${appData.currency}`;
            userInvest.textContent = investVal;
            investValue.textContent = investVal;
            appData.get = (appData.investment * profitPercent) / 100 + appData.investment;
            userGet.textContent = `${appData.get.toFixed(3).replace(".", ",")} ${appData.currency}`;
            appData.profit = appData.get - appData.investment; // доход минус инвестиции
            profitPercentValue.textContent = `${profitPercent} %`;
            profitValue.textContent = `${appData.profit.toFixed(3).replace(".", ",")} ${appData.currency}`;
            console.log(appData);
            calcPercent();
        }
    });

    var amount_slider = $amount_range.data("ionRangeSlider");
    appData.investment = amount_slider.result.from;
    //console.log(appData.investment);
    investVal = `${appData.investment.toFixed(3).replace(".", ",")} ${appData.currency}`;
    userInvest.textContent = investVal;
    investValue.textContent = investVal;
    appData.get = (appData.investment * profitPercent) / 100 + appData.investment;
    userGet.textContent = `${appData.get.toFixed(3).replace(".", ",")} ${appData.currency}`;
    appData.profit = appData.get - appData.investment;
    profitPercentValue.textContent = `${profitPercent} %`;
    profitValue.textContent = `${appData.profit.toFixed(3).replace(".", ",")} ${appData.currency}`;


    function getEndDate() {
        let currentStartDate = investmentStartInput.value;

        let currentStartYearArr = [];
        let currentStartYear;
        for (let i = 0; i < 4; i++) {
            currentStartYearArr.push(currentStartDate[i]);
        }
        //console.log(currentStartYearArr);
        currentStartYear = currentStartYearArr.join('');
        //console.log(currentStartYear);

        let currentStartMonthArr = [];
        let currentStartMonth;
        for (let i = 5; i < 7; i++) {
            currentStartMonthArr.push(currentStartDate[i]);
        }
        //console.log(currentStartMonthArr);
        if (currentStartMonthArr[0] == 0) {
            currentStartMonthArr.splice(0, 1);
        }
        //console.log(currentStartMonthArr);
        currentStartMonth = currentStartMonthArr.join('');
        //console.log(currentStartMonth);

        let currentStartDayArr = [];
        let currentStartDay;
        for (let i = 0; i < currentStartDate.length; i++) {
            currentStartDayArr.push(currentStartDate[i]);
        }
        //console.log(currentStartDayArr);
        currentStartDayArr.splice(0, 8);
        //console.log(currentStartDayArr);
        if (currentStartDayArr[0] == 0) {
            currentStartDayArr.splice(0, 1);
        }
        //console.log(currentStartDayArr);
        currentStartDay = currentStartDayArr.join('');
        //console.log(currentStartDay);
        investmentEndDay = currentStartDay;
        if (investmentEndDay < 10) {
            investmentEndDay = `0${investmentEndDay}`;
        } else {
            investmentEndDay = investmentEndDay;
        }
        //console.log(investmentEndDay);
        investmentEndMonth = +currentStartMonth + appData.term;
        if (investmentEndMonth < 10) {
            investmentEndMonth = `0${investmentEndMonth}`;
        } else {
            investmentEndMonth = investmentEndMonth;
        }
        investmentEndYear = currentStartYear;
        //console.log(investmentEndYear);
        investmentEndDate = new Date(`${investmentEndYear}-${investmentEndMonth}-${investmentEndDay}`);
        investmentEndInput.value = `${investmentEndYear}-${investmentEndMonth}-${investmentEndDay}`;
    }
    getEndDate();

    investmentStartInput.addEventListener('change', () => {
        console.log(investmentStartInput.value);
        getEndDate();
    });

    function formatMonth(startDate, endDate) {
        const monthNames = [
            "января", "февраля", "марта",
            "апреля", "мая", "июня", "июля",
            "августа", "сентября", "октября",
            "ноября", "декабря"
        ];
        let startMonthIndex = startDate.getMonth();
        let endMonthIndex = endDate.getMonth();
        investmentStartFormattedMonth = monthNames[startMonthIndex];
        investmentEndFormattedMonth = monthNames[endMonthIndex];
        formattedStartDate = `${startDate.getDate()} ${investmentStartFormattedMonth} ${startDate.getFullYear()}`;
        formattedEndDate = `${endDate.getDate()} ${investmentEndFormattedMonth} ${endDate.getFullYear()}`;
        appData.startDate = formattedStartDate;
        appData.endDate = formattedEndDate;
    }
    
    formatMonth(investmentStartDate, investmentEndDate);


    $input.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < min) {
            val = min;
        } else if (val > max) {
            val = max;
        }

        instance.update({
            from: val
        });
    });

    function updateInputs() {
        userInvest.textContent = `${appData.investment.toFixed(3).replace(".", ",")} ${appData.currency}`;
        investValue.textContent = `${appData.investment.toFixed(3).replace(".", ",")} ${appData.currency}`;
        profitValue.textContent = `${appData.profit.toFixed(3).replace(".", ",")} ${appData.currency}`;
        userGet.textContent = `${appData.get.toFixed(3).replace(".", ",")} ${appData.currency}`;
    }
    updateInputs();
});



