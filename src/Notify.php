<?php

namespace Marwelln;

class Notify {
    const defaultStatus = 'success';

    /**
     * @var boolean
     */
    public $hasMessage = false;

    /**
     * @var string
     */
    public $status;

    /**
     * When javascript should autoclose the notification. 0 to disabled.
     * In milliseconds.
     * @var int
     */
    public $autocloseTimer = 4000;

    public function __construct(array $attributes = []) {
        $this->messages = $attributes['messages'] ?? [];
        $this->status = 'alert-' . ($attributes['status'] ?? static::defaultStatus);

        if (isset($attributes['autoclose']))
            $this->autocloseTimer = (int) $attributes['autoclose'];

        $this->hasMessage = ! empty($attributes['messages']);
    }

    public function flash($messages, string $status = null) {
        session()->flash('notify', ['messages' => (array) $messages, 'status' => $status]);
    }

    public function messages() {
        return "<p>" . implode('</p><p>', $this->messages) . "</p>";
    }
}