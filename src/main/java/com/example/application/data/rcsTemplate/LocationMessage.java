package com.example.application.data.rcsTemplate;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class LocationMessage extends Message {
    private String title;
    private String label;
    @OneToOne
    private Coordinates coordinates;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Coordinates getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(Coordinates coordinates) {
        this.coordinates = coordinates;
    }
}
