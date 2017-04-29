<?php

namespace Marwelln\Notify;

class ServiceProvider extends \Illuminate\Support\ServiceProvider {
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register() {
    }

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot() {
        $this->loadViewsFrom(__DIR__ . '/../../laravel/views', 'notify');

        $this->publishes([
            __DIR__ . '/../../assets' => resource_path('assets/vendor/marwelln/notify')
        ], 'assets');

        $this->publishes([
            __DIR__ . '/../../laravel/views' => resource_path('views/vendor/notify')
        ], 'views');

        $this->publishes([
            __DIR__ . '/../../laravel/config' => config_path()
        ]);

        // Send notifier variable to given views.
        view()->composer(config('marwelln.notify.views', ['layout.default']), function($view) {
            $view->with('notify', new \Marwelln\Notify(session('notify', [])));
        });
    }
}