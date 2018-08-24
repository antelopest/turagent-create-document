function todayDate() {
    var today = new Date();

    var year = today.getFullYear();
    var date = today.getDate();
    var month = today.getMonth();

    switch (month) {
        case 0: month = 'января'; break;
        case 1: month = 'февраля'; break;        
        case 2: month = 'марта'; break;
        case 3: month = 'апреля'; break;
        case 4: month = 'мая'; break;
        case 5: month = 'июня'; break;
        case 6: month = 'июля'; break;
        case 7: month = 'августа'; break;
        case 8: month = 'сентября'; break;
        case 9: month = 'октября'; break;
        case 10: month = 'ноября'; break;
        case 11: month = 'декабря'; break;        
    }

    var result = date + ' ' + month + ' ' + year;

    return result;
}