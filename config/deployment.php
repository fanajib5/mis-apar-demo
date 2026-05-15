<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Deployment Mode
    |--------------------------------------------------------------------------
    |
    | This configuration determines how the application is deployed and run.
    | Options: single, saas, hybrid, offline
    | - single: single-tenant demo mode (default, backward compatible)
    | - saas: multi-tenant SaaS with subdomain/header tenant detection
    | - hybrid: online + offline sync capability
    | - offline: fully offline mode with SQLite only
    |
    */

    'mode' => env('APP_DEPLOYMENT_MODE', 'single'),

    /*
    |--------------------------------------------------------------------------
    | Tenant Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for multi-tenant operation.
    |
    */

    'tenant' => [
        'enabled' => env('TENANT_ENABLED', true),
        'driver' => env('TENANT_DRIVER', 'subdomain'), // subdomain|header|session
        'header_name' => env('TENANT_HEADER', 'X-Tenant-ID'),
        'fallback_id' => env('TENANT_ID', 1),
        'domain_pattern' => env('TENANT_DOMAIN_PATTERN', '%s.aparmanagement.com'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Sync Configuration (Hybrid Mode)
    |--------------------------------------------------------------------------
    |
    | Settings for the sync engine when running in hybrid mode.
    |
    */

    'sync' => [
        'enabled' => env('SYNC_ENABLED', false),
        'endpoint' => env('SYNC_ENDPOINT', null),
        'interval_seconds' => env('SYNC_INTERVAL_SECONDS', 30),
        'max_batch_size' => env('SYNC_BATCH_SIZE', 100),
        'conflict_resolution' => 'server_wins', // server_wins|merge|client_wins
    ],

    /*
    |--------------------------------------------------------------------------
    | Offline Configuration
    |--------------------------------------------------------------------------
    |
    | Local storage paths for offline mode.
    |
    */

    'offline' => [
        'storage_path' => env('OFFLINE_STORAGE_PATH', storage_path('offline')),
        'db_path' => env('OFFLINE_DB_PATH', database_path('offline.sqlite')),
        'queue_driver' => env('OFFLINE_QUEUE_DRIVER', 'sync'),
    ],
];
