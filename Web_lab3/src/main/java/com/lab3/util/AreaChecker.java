package com.lab3.util;

public class AreaChecker {
    public static boolean checkHit(double x, double y, double r) {
        // окружность R (x <= 0, y >= 0)
        if (x <= 0 && y >= 0) {
            return (x * x + y * y) <= r * r;
        }

        // прямоугольник x in [-R, 0] and y in [-R/2, 0]
        if (x <= 0 && y <= 0) {
            return x >= -r && y >= -r / 2.0;
        }

        // треугольник (0,0), (R/2,0), (0,-R)
        if (x >= 0 && y <= 0) {
            return y >= 2.0 * x - r && x <= r / 2.0;
        }

        return false;
    }
}
