<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Branding Values
    |--------------------------------------------------------------------------
    |
    | Default branding values used when tenant has no custom branding set.
    |
    */

    'defaults' => [
        'logo' => '/images/logo.svg',
        'primary_color' => '#3b82f6',
        'custom_css_url' => null,
        'favicon_url' => null,
        'company_name' => env('APP_NAME', 'APAR Management System'),
    ],

];
