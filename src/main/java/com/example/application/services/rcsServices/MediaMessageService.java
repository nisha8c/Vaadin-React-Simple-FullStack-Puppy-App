package com.example.application.services.rcsServices;

import com.example.application.data.rcsTemplate.MediaMessage;
import com.example.application.data.rcsTemplate.MediaMessageRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;

@AnonymousAllowed
@BrowserCallable
public class MediaMessageService extends CrudRepositoryService<MediaMessage, Long, MediaMessageRepository> {
}
