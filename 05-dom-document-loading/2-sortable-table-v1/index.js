export default class SortableTable {
    element;
    columns = [];
    subElements;

    constructor(header, {data}){
        this.header = header;
        header.forEach( item => {
            const column = (item.template) ? [item.id, item.template] : item.id;
            return this.columns.push(column);
        });
        this.data = data;

        this.createElement();
    }

    createElement(){
        this.element = document.createElement('div');
        this.element.innerHTML = this.createTable(this.data);
        this.element = this.element.firstElementChild;
        this.subElements = this.element.querySelector('.sortable-table');
        this.subElements.header = this.subElements.children[0];
        this.subElements.body = this.subElements.children[1];
    }

    createHeader(){
        return `
            <div class="sortable-table__header sortable-table__row">
                ${this.header.map( (column) => {
                    return `
                        <div class="sortable-table__cell" data-id="${column.id}" data-sortable="${column.sortable}">
                            <span>${column.title}</span>
                        </div>
                       `
                }).join('')}
            </div>
        `
    }

    getCell(row, column){
        if (Array.isArray(column)){
            return column[1]();
        }
        return `<div class="sortable-table__cell">${row[column]}</div>`
    }

    createBodyCells(row){
        return this.columns.reduce( (previosValue, column) => {
                return `
                    ${previosValue}
                    ${this.getCell(row, column)}
                `
            }, ''
            )
    }

    createBody(data = this.data){
        return `
            <div class="sortable-table__body">
                ${data.reduce( (previosValue, row) => {
                    return `
                        ${previosValue}
                        <div class="sortable-table__row">
                            ${this.createBodyCells(row)}
                        </div>
                    `
                }, ''
                )
                }
            </div>
        `;
    }

    createTable(){
        return `
            <div class="products-list__container">
                <div class="sortable-table">
                    ${this.createHeader()}
                    ${this.createBody()}
                </div>
            </div>
        `
    }

    sort(fieldValue, orderValue){
        if (this.element.querySelector(`
            [data-id=${fieldValue}][data-sortable=false]
        `)
        )   return;
        if (!(orderValue === 'asc' || orderValue === 'desc'))
            return;

        const column = this.header.find(item => item.id === fieldValue);
        if (!column) {
            return;
        }
        const sortType = column.sortType;
        if (!(sortType === 'string' || sortType === 'number')){
            return;
        }

        function check(first, second) {
            if (sortType === 'string'){
                return first[fieldValue].localeCompare(second[fieldValue], ['ru', 'en'], {caseFirst: 'upper'});
            } else if (sortType === 'number'){
                return first[fieldValue] - second[fieldValue];
            }
        }

        const div = document.createElement('div');
        div.innerHTML = this.createBody([...this.data].sort( (first, second) => {
            if (orderValue === 'asc') {
                return check(first, second);
            } else if (orderValue === 'desc') {
                return check(second, first);
            };  
        })
        );
        this.subElements.body.remove();
        this.subElements.append(div.firstElementChild);
        this.subElements.body = this.element.querySelector('.sortable-table__body');
    }

    destroy(){
        this.remove();
    }

    remove(){
        if (this.element){
            this.element.remove();
            this.element = null;
            this.subElements = null;
        }
    }
}

