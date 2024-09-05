package com.example.application.data.rcsTemplate;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import java.util.List;

@Entity
public class CardMessage extends Message {
    private String title;
    private String description;
    @OneToOne
    private MediaMessage mediaMessage;
    @OneToMany
    private List<Choice> choices;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MediaMessage getMediaMessage() {
        return mediaMessage;
    }

    public void setMediaMessage(MediaMessage mediaMessage) {
        this.mediaMessage = mediaMessage;
    }

    public List<Choice> getChoices() {
        return choices;
    }

    public void setChoices(List<Choice> choices) {
        this.choices = choices;
    }
}

