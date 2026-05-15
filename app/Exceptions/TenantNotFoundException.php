<?php

namespace App\Exceptions;

use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

class TenantNotFoundException extends HttpResponseException
{
    /**
     * Create a new exception instance.
     */
    public function __construct(string $message = 'Tenant not found.', ?Response $response = null)
    {
        $response = $response ?: response()->json([
            'error' => 'tenant_not_found',
            'message' => $message,
        ], 404);

        parent::__construct($response);
    }
}
