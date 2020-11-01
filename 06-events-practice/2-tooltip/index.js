class Tooltip {
    static instance;
    element;

    constructor(){      
        if (Tooltip.instance){
            return Tooltip.instance;
        }
        Tooltip.instance = this;
    }

    initEventListeners(){
        document.addEventListener('pointerover', this.pointerOver);
        document.addEventListener('pointerout', this.pointerOut);
    }

    initialize(){
        this.initEventListeners();
    }

    render(value = ''){
        if (this.element){
            return;
        }

        this.element = document.createElement('div');
        this.element.className = 'tooltip';
        this.element.innerHTML = value;

        document.body.append(this.element);
    }

    pointermove = event => {
        this.element.style.left = event.clientX + 10 + 'px';
        this.element.style.top = event.clientY + 10 + 'px';        
    }

    pointerOver = event => {
        const el = event.target.closest('[data-tooltip]');
        if (!el){
            return;
        }

        this.render(el.dataset.tooltip);

        document.addEventListener('pointermove', this.pointermove);
    }

    pointerOut = event => {
        const el = event.target.closest('[data-tooltip]');
        if (!el){
            return;
        }
        document.removeEventListener('pointermove', this.pointermove);
        if (this.element){
            this.element.remove();
            this.element = null;
        }
    }

    destroy(){
        document.removeEventListener('pointermove', this.pointermove);
        document.removeEventListener('pointerover', this.pointerOver);        
        document.removeEventListener('pointerout', this.pointerOut);                

        if (this.element){
            this.element.remove();
            this.element = null;
        }
    }
}

const tooltip = new Tooltip();

export default tooltip;
