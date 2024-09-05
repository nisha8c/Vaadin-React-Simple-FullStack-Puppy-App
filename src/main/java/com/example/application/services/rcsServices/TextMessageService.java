package com.example.application.services.rcsServices;

import com.example.application.data.rcsTemplate.TextMessage;
import com.example.application.data.rcsTemplate.TextMessageRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;

@AnonymousAllowed
@BrowserCallable
public class TextMessageService extends CrudRepositoryService<TextMessage, Long, TextMessageRepository> {
}
