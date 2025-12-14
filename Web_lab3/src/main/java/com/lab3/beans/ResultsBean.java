package com.lab3.beans;

import com.lab3.db.ResultsDAO;
import com.lab3.model.PointResult;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Named("resultsBean")
@SessionScoped
public class ResultsBean implements Serializable {
    private final ResultsDAO resultsDAO = new ResultsDAO();
    
    private List<PointResult> results;

    public List<PointResult> getResults() {
        if (results == null) {
            try {
                results = new ArrayList<>(resultsDAO.getAllResults());
            } catch (Exception e) {
                e.printStackTrace();
                results = new ArrayList<>();
            }
        }
        return results;
    }

    public void addResult(PointResult result) {
        try {
            resultsDAO.save(result);
            if (results == null) {
                results = new ArrayList<>();
            }
            results.add(0, result); // Add to beginning for display order
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public void clearResults() {
        try {
            resultsDAO.clearResults();
            if (results != null) {
                results.clear();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getJsonResults() {
        List<PointResult> currentResults = getResults();
        if (currentResults == null || currentResults.isEmpty()) {
            return "[]";
        }
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < currentResults.size(); i++) {
            PointResult r = currentResults.get(i);
            sb.append(String.format("{\"x\":%s, \"y\":%s, \"r\":%s, \"result\":%s}", 
                r.getX(), r.getY(), r.getR(), r.isResult()));
            if (i < currentResults.size() - 1) {
                sb.append(",");
            }
        }
        sb.append("]");
        return sb.toString();
    }
}