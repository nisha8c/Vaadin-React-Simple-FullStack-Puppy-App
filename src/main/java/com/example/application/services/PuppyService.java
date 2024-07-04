package com.example.application.services;

import com.example.application.data.Puppy;
import com.example.application.data.PuppyRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@AnonymousAllowed
@BrowserCallable
@Service
public class PuppyService {
    @Autowired
    private PuppyRepository puppyRepository;

    @PostConstruct
    public void init() {
        if (puppyRepository.count() == 0) {
            Puppy puppy1 = new Puppy();
            puppy1.setName("Max");
            puppy1.setBreed("Golden Retriever");
            puppy1.setDescription("Friendly and energetic");
            puppyRepository.save(puppy1);

            Puppy puppy2 = new Puppy();
            puppy2.setName("Bella");
            puppy2.setBreed("Labrador Retriever");
            puppy2.setDescription("Gentle and intelligent");
            puppyRepository.save(puppy2);

            Puppy puppy3 = new Puppy();
            puppy3.setName("Maximus");
            puppy3.setBreed("Golden Retriever");
            puppy3.setDescription("Loving and helpful");
            puppyRepository.save(puppy3);

            Puppy puppy4 = new Puppy();
            puppy4.setName("Ronny");
            puppy4.setBreed("Labrador Retriever");
            puppy4.setDescription("Enthusiastic and loves walks");
            puppyRepository.save(puppy4);
        }
    }

    public List<Puppy> getAllPuppies() {
        return puppyRepository.findAll();
    }

    public Puppy getPuppy(Long id) {
        return Objects.requireNonNull(puppyRepository.findById(id).orElse(null));
    }

    public Puppy createPuppy(Puppy puppy) {
        return puppyRepository.save(puppy);
    }

    public Puppy updatePuppy(Long id, Puppy puppyDetails) {
        Puppy puppy = getPuppy(id);
        puppy.setName(puppyDetails.getName());
        puppy.setBreed(puppyDetails.getBreed());
        puppy.setDescription(puppyDetails.getDescription());
        return puppyRepository.save(puppy);
    }

    public void deletePuppy(Long id) {
        puppyRepository.deleteById(id);
    }
}
