var ParseDate = {
  parseDate: function(date) {
    return  (
      date.split('T').map(function(el, i) {
        if (i != 0) return el.split('.')[0];
        return el;
      }).join(", ")
    );
  }
};
