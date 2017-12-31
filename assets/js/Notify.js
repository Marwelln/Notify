class Notify {
    constructor(message, status) {
        if ( ! message)
            return this;

        this.builder = new NotifyBuilder();
        this.message = message;
        this.status = status ? status : 'success';
    }

    open(options) {
        this.builder.message(this.message).status(this.status).build(document.querySelector('body > div.container'), options);
    }

    close() {
        this.builder.close();
    }

    /**
     * Find notify element if exists and apply calls to it.
     */
    find(notify) {
        this.builder = new NotifyBuilder(notify);

        if ( ! this.builder.onPageLoad)
            return false;

        this.builder.open();
        this.builder.autoclose();
    }
}