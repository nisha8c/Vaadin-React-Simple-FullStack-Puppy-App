package com.example.application.data.rcsTemplate;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class CarouselMessage extends Message {
    @OneToMany
    private List<CardMessage> cards;
    @OneToMany
    private List<Choice> choices;

    public List<CardMessage> getCards() {
        return cards;
    }

    public void setCards(List<CardMessage> cards) {
        this.cards = cards;
    }

    public List<Choice> getChoices() {
        return choices;
    }

    public void setChoices(List<Choice> choices) {
        this.choices = choices;
    }
}
