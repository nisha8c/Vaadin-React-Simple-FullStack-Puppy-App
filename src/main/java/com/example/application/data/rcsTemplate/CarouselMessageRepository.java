package com.example.application.data.rcsTemplate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CarouselMessageRepository extends JpaRepository<CarouselMessage, Long>, JpaSpecificationExecutor<CarouselMessage> {
}
