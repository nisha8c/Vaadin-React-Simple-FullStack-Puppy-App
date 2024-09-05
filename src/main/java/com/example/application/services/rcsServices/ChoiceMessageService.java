package com.example.application.services.rcsServices;

import com.example.application.data.rcsTemplate.ChoiceMessage;
import com.example.application.data.rcsTemplate.ChoiceMessageRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;

@AnonymousAllowed
@BrowserCallable
public class ChoiceMessageService extends CrudRepositoryService<ChoiceMessage, Long, ChoiceMessageRepository> {
}
