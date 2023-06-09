<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit041ab7dbffed9cebdc249904337c043b
{
    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'App\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit041ab7dbffed9cebdc249904337c043b::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit041ab7dbffed9cebdc249904337c043b::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit041ab7dbffed9cebdc249904337c043b::$classMap;

        }, null, ClassLoader::class);
    }
}
