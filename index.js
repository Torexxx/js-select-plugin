import {Select} from './select/select'
import './select/styles.scss'

const select = new Select('#select', {
    placeholder: 'Выберите элемент из списка',
    // selectedId: '2',
    data: [
        {id: '1', value: 'React'},
        {id: '2', value: 'Angular'},
        {id: '3', value: 'Vue'},
    ],
        onSelect(item) {
            console.log('Selected:', item)
        }
});

// select.select('2')
window.select = select;

