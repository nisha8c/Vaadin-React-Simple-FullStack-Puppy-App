package com.example.application.data.rcsTemplate;

import jakarta.persistence.Entity;

@Entity
public class TextMessage extends Message {
    private String textContent;

    public String getTextContent() {
        return textContent;
    }

    public void setTextContent(String textContent) {
        this.textContent = textContent;
    }
}
