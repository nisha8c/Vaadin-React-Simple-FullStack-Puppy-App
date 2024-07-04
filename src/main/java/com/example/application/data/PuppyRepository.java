package com.example.application.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PuppyRepository extends JpaRepository<Puppy, Long> {
}
