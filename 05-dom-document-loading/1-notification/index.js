export default class NotificationMessage {
    element;
    hasMessage;

    constructor(text, {duration = 1000, type = 'success'} = {}){
        this.text = text;
        this.duration = duration;
        this.type = type;

        this.element = this.createMessageElement();        
    }    

    createEl(name, classNames, parent){
        const el = document.createElement(name);

        for (let className of classNames){
            el.classList.add(className);
        }

        if (parent){
            parent.append(el);
        }

        return el;
    }

    createDivEl(classNames, parent){
        return this.createEl('div', classNames, parent);
    }

    createMessageElement(){
        if (this.element) {
            return this.element;
        }      

        const parentEl = this.createDivEl(['notification', this.type]);
        
        parentEl.setAttribute('style', `--value:${this.duration/1000}s`);
        
        const timer = this.createDivEl(['timer'], parentEl);

        const wrapper = this.createDivEl(['inner-wrapper'], parentEl);

        const headerEl = this.createDivEl(['notification-header'], wrapper);
        headerEl.innerHTML = this.type;

        const bodyEl = this.createDivEl(['notification-body'], wrapper);
        bodyEl.innerHTML = this.text;

        return parentEl;
    }

    show(parentEl = document.body){        
        if (NotificationMessage.hasMessage){
            return;
        }
        this.element = this.createMessageElement();
        parentEl.append(this.element);                
        NotificationMessage.hasMessage = true;

        setTimeout(this.remove, this.duration, this.element);        
    }

    remove(thisEl){
        if (thisEl){
            thisEl.remove();
            thisEl = null;
        } else if (this.element) {
            this.element.remove();
            this.element = null;
        }
        NotificationMessage.hasMessage = false;
    }

    destroy(){
        this.remove();
    }
}
