const getTemplate = (data=[], placeholder, selectedId) => {

    let text = placeholder ?? 'Дефолтный плейсхолдер';
    let items = data.map(item => {
        let cls = '';
        if (item.id === selectedId) {
            cls = 'select__item-active'
            text = item.value;

        }
        return `<li class="select__item ${cls}"  data-type="item" data-id="${item.id}" >${item.value}</li>`
    })

    return `
            <div class="select__backdrop" data-type="backdrop"></div>
            <div class="select__input" data-type="input">
                <span data-type="value">${text}</span>
                <i class="fa fa-chevron-up" data-type="arrow"></i>
            </div>
            <div class="select__dropdown">
                <ul class="select__list">
                    ${items.join('')}
                </ul>
            </div>
    `
}

export class Select {
    constructor(selector, options) {
        this.options = options;
        this.selectedId = options.selectedId;
        this.$el = document.querySelector(selector);
        this.#render();
        this.#setup();
    }

    #render() {
        const {data, placeholder} = this.options;
        this.$el.classList.add('select');
        this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
    }

    #setup() {
        this.$arrow = this.$el.querySelector('[data-type="arrow"]');
        this.$value = this.$el.querySelector('[data-type="value"]');
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
    }

    clickHandler(e) {
        e.stopPropagation();
        const {type} = e.target.dataset;
        if (type === 'input' || type === 'value') {
            this.toggle();
        } else if (type === 'item') {
            const id = e.target.dataset.id;
            this.select(id);
        }  else if (type === 'backdrop') {
            this.close()
        }
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    get isOpen() {
        return this.$el.classList.contains('open');
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId)
    }

    select(id) {
        this.selectedId = id;
        this.$value.textContent = this.current.value;

        this.$el.querySelectorAll(`[data-type="item"]`).forEach(el => el.classList.remove('select__item-active'));
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('select__item-active');
        this.options.onSelect ? this.options.onSelect(this.current) : null;
        this.close();
    }

    open() {
        this.$el.classList.add('open');
        this.$arrow.classList.remove('fa-chevron-up');
        this.$arrow.classList.add('fa-chevron-down');

    }

    close() {
        this.$el.classList.remove('open');
        this.$arrow.classList.remove('fa-chevron-down');
        this.$arrow.classList.add('fa-chevron-up');

    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.innerHTML = '';
    }
}