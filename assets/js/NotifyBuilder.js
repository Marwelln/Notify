class NotifyBuilder {
    constructor(notify) {
        this.notify = notify ? notify : document.createElement('div');
        this.onPageLoad = !! notify;

        this.notify.dataset.javascript = true;

        // Message container.
        this.messageContainer = document.createElement('div');
        this.messageContainer.id = 'notifier-message';

        // Close button.
        let closeButtonCreated = false;
        this.closeButton = this.notify.querySelector('button.close');
        if ( ! this.closeButton) {
            this.closeButton = document.createElement('button');
            closeButtonCreated = true;
        }

        this.closeButton.classList.remove('hide');
        this.closeButton.addEventListener('click', this.close.bind(this));

        if (closeButtonCreated) {
            this.closeButton.classList.add('close');
            this.closeButton.innerHTML = "<i class='fa fa-remove'></i>";
            this.notify.appendChild(this.closeButton);
        }
    }

    status(status) {
        this.statusClass = status;

        return this;
    }

    message(message) {
        if (typeof message === 'undefined') {
            this.messageContainer.innerHTML = '';

            return this;
        }

        // Remove previous message first.
        this.message();

        let p = document.createElement('p');
        p.innerHTML = message;

        this.messageContainer.appendChild(p);

        return this;
    }

    open() {
        // Clear previous timeout from autoclose to prevent accidental close on notification.
        clearTimeout(this.timeout);

        this.notify.classList.remove('closed');

        // Need to add a timeout for CSS to be able to run transitions.
        setTimeout(function(){
            this.notify.classList.add('opening');
        }.bind(this), 10);

        // Dont autoclose the notification if we hover over it.
        this.notify.addEventListener('mouseover', function(){
            clearTimeout(this.timeout);
        }.bind(this));
    }

    close() {
        this.notify.classList.add('closed');
    }

    autoclose() {
        if ( ! this.notify.dataset.notifyAutoclose)
            return this;

        let timer = this.notify.dataset.notifyAutoclose;

        this.timeout = setTimeout(this.close.bind(this), timer);

        return this;
    }

    build(container) {
        this.container = typeof container === 'object' ? container : document.querySelector(container ? container : '#wrapper');

        this.notify.id = 'notify';
        this.notify.classList.add('alert');

        this.statuses = ['success', 'info', 'danger', 'default'];
        this.defaultStatusClass = this.statusClass = 'success';

        this.notify.appendChild(this.messageContainer);

        // Remove previous statuses.
        for (let i = 0; i < this.statuses.length; ++i) {
            this.notify.classList.remove('alert-' + this.statuses[i]);
        }

        this.notify.classList.add('alert-' + this.statusClass);

        let notifier = document.getElementById(this.notify.id);
        if (notifier) this.container.removeChild(notifier);

        this.container.insertBefore(this.notify, this.container.firstChild);

        open();

        this.autoclose();

        // Reset status to default value.
        this.statusClass = this.defaultStatusClass;
    }
}