package com.lab3.beans;

import com.lab3.model.PointResult;
import com.lab3.util.AreaChecker;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import java.io.Serializable;
import java.time.LocalDateTime;

@Named("pointBean")
@SessionScoped
public class PointBean implements Serializable {

    private double x;
    private double y;
    private double r = 2.0; // Default R

    @Inject
    private ResultsBean resultsBean;

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void submit() {
        long startTime = System.nanoTime();
        boolean isHit = AreaChecker.checkHit(x, y, r);
        long executionTime = (System.nanoTime() - startTime) / 1000; // microseconds

        PointResult result = new PointResult();
        result.setX(x);
        result.setY(y);
        result.setR(r);
        result.setResult(isHit);
        result.setExecutedAt(LocalDateTime.now());
        result.setExecutionTime(executionTime);

        resultsBean.addResult(result);
    }
}