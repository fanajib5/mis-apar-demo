<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        $permissions = [
            // User Management
            'view users',
            'create users',
            'edit users',
            'delete users',

            // Role & Permission Management
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            'assign roles',

            // Customer Management
            'view customers',
            'create customers',
            'edit customers',
            'delete customers',

            // Product Management
            'view products',
            'create products',
            'edit products',
            'delete products',

            // APAR Unit Management
            'view apar units',
            'create apar units',
            'edit apar units',
            'delete apar units',
            'assign apar units',

            // Inspection Management
            'view inspections',
            'create inspections',
            'edit inspections',
            'delete inspections',
            'approve inspections',

            // Certificate Management
            'view certificates',
            'create certificates',
            'edit certificates',
            'delete certificates',
            'print certificates',

            // Sales Order Management
            'view sales orders',
            'create sales orders',
            'edit sales orders',
            'delete sales orders',
            'approve sales orders',

            // Invoice Management
            'view invoices',
            'create invoices',
            'edit invoices',
            'delete invoices',
            'approve invoices',
            'print invoices',

            // Payment Management
            'view payments',
            'create payments',
            'edit payments',
            'delete payments',

            // Quotation Management
            'view quotations',
            'create quotations',
            'edit quotations',
            'delete quotations',
            'approve quotations',

            // Reporting
            'view reports sales',
            'view reports inventory',
            'view reports financial',
            'export reports',

            // Dashboard
            'view dashboard',
            'view analytics',

            // Commission
            'view commissions',
            'process commissions',

            // Service History
            'view service history',
            'create service history',
            'edit service history',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $this->command->info('Permissions created: ' . count($permissions));

        // Create Roles
        $adminRole = Role::firstOrCreate(['name' => 'super-admin']);
        $managerRole = Role::firstOrCreate(['name' => 'manager']);
        $salesRole = Role::firstOrCreate(['name' => 'sales']);
        $technicianRole = Role::firstOrCreate(['name' => 'technician']);
        $customerRole = Role::firstOrCreate(['name' => 'customer']);

        $this->command->info('Roles created: 5');

        // Assign permissions to roles
        // Super Admin - all permissions
        $adminRole->syncPermissions(Permission::all());

        // Manager - most permissions except user/role management
        $managerRole->syncPermissions([
            'view customers', 'create customers', 'edit customers', 'delete customers',
            'view products', 'create products', 'edit products', 'delete products',
            'view apar units', 'create apar units', 'edit apar units', 'assign apar units',
            'view inspections', 'create inspections', 'edit inspections', 'approve inspections',
            'view certificates', 'create certificates', 'edit certificates', 'print certificates',
            'view sales orders', 'create sales orders', 'edit sales orders', 'approve sales orders',
            'view invoices', 'create invoices', 'edit invoices', 'approve invoices', 'print invoices',
            'view payments', 'create payments', 'edit payments',
            'view reports sales', 'view reports inventory', 'view reports financial', 'export reports',
            'view dashboard', 'view analytics',
            'view commissions', 'process commissions',
            'view service history', 'create service history', 'edit service history',
        ]);

        // Sales - customer, product, sales order, quotation
        $salesRole->syncPermissions([
            'view customers',
            'view products',
            'view apar units',
            'view quotations', 'create quotations', 'edit quotations', 'delete quotations', 'approve quotations',
            'view sales orders', 'create sales orders', 'edit sales orders',
            'view invoices',
            'view reports sales',
            'view dashboard',
        ]);

        // Technician - APAR units & inspections
        $technicianRole->syncPermissions([
            'view apar units',
            'view inspections', 'create inspections', 'edit inspections',
            'view certificates',
            'view service history', 'create service history', 'edit service history',
        ]);

        // Customer - only view own data (will be enforced via middleware/scope)
        $customerRole->syncPermissions([
            'view certificates',
            'view service history',
        ]);

        $this->command->info('Permissions assigned to roles.');
        $this->command->info('✅ Role & Permission seeding completed!');
    }
}
