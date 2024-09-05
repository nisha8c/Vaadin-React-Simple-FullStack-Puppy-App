package com.example.application.services.rcsServices;

import com.example.application.data.rcsTemplate.LocationMessage;
import com.example.application.data.rcsTemplate.LocationMessageRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;

@AnonymousAllowed
@BrowserCallable
public class LocationMessageService extends CrudRepositoryService<LocationMessage, Long, LocationMessageRepository> {
}
