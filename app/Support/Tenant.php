<?php

namespace App\Support;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \App\Models\Tenant|null current()
 * @method static void setCurrent(\App\Models\Tenant|null $tenant)
 * @method static bool isScopingEnabled()
 * @method static void fake(int $tenantId)
 * @method static void resetFake()
 * @method static mixed withoutScoping(callable $callback)
 * @method static \App\Models\Tenant|null resolveFromRequest(\Illuminate\Http\Request $request)
 *
 * @see TenantManager
 */
class Tenant extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'tenant';
    }
}
