import fetchJson from './utils/fetch-json.js';

export default class ColumnChart {
    element;
    subElements;
    chartHeight = 50;
    serverUrl = 'https://course-js.javascript.ru';

    constructor({
        label = '', 
        link = '', 
        value = 0, 
        url = '',
        range = {
            from: new Date(),
            to: new Date(),
          },
        formatHeading = data => data
        } = {}) {
        this.label = label;
        this.value = value;
        this.link = link;
        this.url = new URL(url, this.serverUrl);
        this.range = range;
        this.formatHeading = formatHeading;

        this.render();
    }

    getLink(){
        if (!this.link){
            return '';
        }
        return `
            <a href=${this.link} class='column-chart__link'>
                View all
            </a>
        `
    }

    createEl(){
        return `
            <div class='column-chart'>
                <div class='column-chart__title'>
                    Total ${this.label}
                    ${this.getLink()}
                </div>
                <div class='column-chart__container'>
                    <div data-element='header' class='column-chart__header'>                
                        ${this.value}
                    </div>
                    <div data-element='body' class='column-chart__chart'>                
                    </div>
                </div>
            </div>
        `;
    }

    async update(from = this.range.from, to = this.range.to){
        this.setLoading(true);

        this.url.searchParams.set('from', from.toISOString());
        this.url.searchParams.set('to', to.toISOString());
        const response = Object.values( await fetchJson(this.url) );

        const maxValue = Math.max(...response);
        response.forEach( item => {
            const val = Math.floor( (item * this.chartHeight) / maxValue );
            const percent = (item / maxValue * 100).toFixed(0);
            const el = document.createElement('div');
            el.innerHTML = `
                <div style='--value: ${val}' data-tooltip='${percent}%'>
                </div>
            `;
            this.subElements.body.append(el.firstElementChild);
        });
        this.subElements.header.innerHTML = this.formatHeading( response.reduce((a, b) => a + b) );

        this.setLoading(false);
    }

    setLoading(loading){
        if (loading){
            this.subElements.body.innerHTML = '';
            this.element.classList.add('column-chart_loading');
        } else {
            this.element.classList.remove('column-chart_loading');
        }
    }

    render(){
        this.remove();
        const parent = document.createElement('div');
        parent.innerHTML = this.createEl();
        this.element = parent.firstElementChild;
        this.subElements = this.element.querySelector('.column-chart__container');
        this.subElements.header = this.subElements.children[0];
        this.subElements.body = this.subElements.children[1];

        this.update();
    }

    remove(){
        if (this.subElements){
            this.subElements.remove();
            this.subElements = null;
        }
        if (this.element){
            this.element.remove();
            this.element = null;
        }
    }

    destroy(){
        this.remove();
    }
}
