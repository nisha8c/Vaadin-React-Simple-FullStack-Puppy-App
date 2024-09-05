package com.example.application.data.rcsTemplate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CardMessageRepository extends JpaRepository<CardMessage, Long>, JpaSpecificationExecutor<CardMessage> {
}
