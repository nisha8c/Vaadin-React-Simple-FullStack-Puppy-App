package com.example.application.services.rcsServices;

import com.example.application.data.rcsTemplate.CardMessage;
import com.example.application.data.rcsTemplate.CardMessageRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;

@AnonymousAllowed
@BrowserCallable
public class CardMessageService extends CrudRepositoryService<CardMessage, Long, CardMessageRepository> {
}
