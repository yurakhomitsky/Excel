export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = [];
        this.current = null;
    }
    // element instanceof DOM class
    select(element) {
        this.clear();
        this.group.push(element);
        this.current = element;
        element.focus().addClass('selected');
    }

    selectGroup($group = []) {
        this.clear();
        this.group = $group;
        this.group.forEach(element => element.addClass(TableSelection.className));
    }
    clear() {
        this.group.forEach(element => element.removeClass(TableSelection.className))
        this.group = []
    }
}