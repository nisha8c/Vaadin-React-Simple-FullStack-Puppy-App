package com.example.application.services.rcsServices;

import com.example.application.data.rcsTemplate.CarouselMessage;
import com.example.application.data.rcsTemplate.CarouselMessageRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;

@AnonymousAllowed
@BrowserCallable
public class CarouselMessageService extends CrudRepositoryService<CarouselMessage, Long, CarouselMessageRepository> {
}
