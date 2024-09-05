package com.example.application.data.rcsTemplate;

import jakarta.persistence.Entity;

@Entity
public class MediaMessage extends Message {
    private String mediaUrl;

    public String getMediaUrl() {
        return mediaUrl;
    }

    public void setMediaUrl(String mediaUrl) {
        this.mediaUrl = mediaUrl;
    }
}
