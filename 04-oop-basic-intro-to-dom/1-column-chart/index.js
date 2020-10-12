export default class ColumnChart {
    _element;
    _charHeight = 50;

    constructor({data = [], label = '', link = '', value = 0} = {}) {
        this.data = data;
        this.label = label;
        this.value = value;
        this.link = link;

        this.draw();
    }

    createEl(name, className, html, parent){
        const el = document.createElement(name);

        let _className = 'column-chart';       
        if (className) {
            _className = `${_className}__${className}`;
        }
        el.classList.add(_className);

        if (html){
            el.innerHTML = html;
        }

        if (parent){
            parent.append(el);
        }

        return el;
    }

    createDivEl(className, html, parent){
        return this.createEl('div', className, html, parent);
    }

    draw() {
        const parent = this.createDivEl();

        const title = this.createDivEl('title', `Total ${this.label}`, parent);

        if (this.link){
            this.createEl('a', 'link', 'View all', title).
              setAttribute('href', `${this.link}`);
        }

        const container = this.createDivEl('container', '', parent);

        const header = this.createDivEl('header', this.value, container);

        const chart = this.createDivEl('chart', '', container);        

        if (this.data.length === 0) {
            parent.classList.add('column-chart_loading');
        } else {
          const maxValue = Math.max(...this.data);
          for (let item of this.data){
            const value = document.createElement('div');
            const val = Math.floor( (item * this.chartHeight) / maxValue );
            const percent = (item / maxValue * 100).toFixed(0);
            value.setAttribute('style', `--value: ${val}`);
            value.setAttribute('data-tooltip', `${percent}%`);            

            chart.append(value);
          }
        }

        this._element = parent;
    }

    get element() {
        return this._element;
    }

    get chartHeight(){
        return this._charHeight;
    }

    update(data){
        this.remove();
        this.draw();
    }

    remove(){
        this._element.remove();        
    }

    destroy(){
        this.remove();
    }
}
