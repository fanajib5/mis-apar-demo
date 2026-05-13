<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

#[Signature('demo:refresh {--force : Force refresh without confirmation}')]
#[Description('Reset database to fresh demo state (truncate all data and reseed)')]
class DemoRefresh extends Command
{
    protected $description = 'Reset database to fresh demo state (truncate all data and reseed)';

    public function handle(): int
    {
        if (! $this->option('force') && ! $this->confirm('This will delete all data and reseed. Are you sure?')) {
            $this->info('Cancelled.');

            return Command::SUCCESS;
        }

        $this->info('Starting demo database refresh...');
        Log::info('Demo refresh started');

        try {
            // Drop all tables and re-run migrations (fresh start)
            $this->info('Dropping all tables and running migrations...');

            // Log to dedicated channel
            Log::channel('demo-refresh')->info('Demo refresh started');

            Artisan::call('migrate:fresh', ['--force' => true]);
            Artisan::output();
            $this->info('Migrations completed');
            Log::channel('demo-refresh')->info('Migrations completed');

            // Seed demo data
            $this->info('Seeding demo data...');
            Artisan::call('db:seed', ['--force' => true]);
            Artisan::output();
            $this->info('Demo data seeded successfully');
            Log::channel('demo-refresh')->info('Demo data seeded successfully');

            // Clear caches
            $this->info('Clearing caches...');
            Artisan::call('config:clear');
            Artisan::call('cache:clear');
            Artisan::call('route:clear');
            Artisan::call('view:clear');
            $this->info('Caches cleared');
            Log::channel('demo-refresh')->info('Caches cleared');

            Log::channel('demo-refresh')->info('Demo refresh completed successfully');
            $this->info('✅ Demo refresh completed!');
            $this->info('Login: demo@aparmanagement.com / password');
            $this->info('Team: PT Demo APAR');

            return Command::SUCCESS;

        } catch (\Exception $e) {
            Log::channel('demo-refresh')->error('Demo refresh failed: '.$e->getMessage(), ['exception' => $e]);
            $this->error('❌ Error: '.$e->getMessage());

            // Try to re-enable foreign key checks (ignore errors)
            try {
                DB::statement('PRAGMA foreign_keys = ON');
            } catch (\Exception $e2) {
                try {
                    DB::statement('SET FOREIGN_KEY_CHECKS=1');
                } catch (\Exception $e3) {
                    // Ignore
                }
            }

            return Command::FAILURE;
        }
    }
}
