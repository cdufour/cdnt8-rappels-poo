<?php

namespace DesignPatterns;

class Singleton
{
    private static $instances = [];
    //protected function __construct() { }

    /**
     * Méthode statique contrôlant l'instance
     * Si l'instance a déjà été créée (placées dans la propriété
     * statique $instances), cette instance est retournée
     */
    public static function getInstance(): Singleton
    {
        $cls = static::class;
        if (!isset(self::$instances[$cls])) {
            self::$instances[$cls] = new static();
        }

        return self::$instances[$cls];
    }
}

/*
* Code client
*/
function clientCode()
{
    $s1 = Singleton::getInstance();
    $s2 = Singleton::getInstance();
    
    if ($s1 === $s2) {
        echo "[+] Les variables contiennent la même instance";
    } else {
        echo "[-] Les variables contiennent des instances différentes";
    }
}

clientCode();