
window.onload = () => {
    console.log('app started.', DATABASE);
    const PLP = document.getElementById('container');
    let template = '';
    DATABASE.forEach(item => {
        let element = new Render('template', item);
        template += element.render();
    });
    PLP.innerHTML = template;

    let filterValues = document.getElementById('filterBy');
    
    function byField(value) {
        return (a, b) => (a[value] > b[value] ? 1 : -1); 
    };
    filterValues.addEventListener('change', (e) => {
        DATABASE.sort(byField(e.target.value));
    PLP.innerHTML = '';
    template = '';
    DATABASE.forEach(item => {
        let element = new Render('template', item);
        template += element.render();
    });
    PLP.innerHTML = template;
});

    let amount = document.querySelectorAll('.plp__content--quantity');
    [...amount].forEach(function(quantity) {
        let minus =  quantity.querySelector('.js-button-minus');
        let plus = quantity.querySelector('.js-button-plus');
        let amountField = quantity.querySelector('.js-selector-quantity');

        minus.addEventListener('click', function min() {
            const currentValue = Number(amountField.innerHTML);
            if (currentValue > 0) {
                amountField.innerHTML = currentValue - 1;
            } else {
                amountField.innerHTML = 0;
            }
      });
        plus.addEventListener('click', function plus() {
            const currentValue = Number(amountField.innerHTML);
            amountField.innerHTML = currentValue + 1;
        });
    });
};


class Render {
    constructor(templateId, data) {
      this.template = document.getElementById(templateId).innerText;
      this.data = data;
    }
  
    render() {
      for(let key in this.data) {
        this.template = this.template.replace(`{{${key}}}`, this.data[key]);
      }
      return this.template;
    }
  }