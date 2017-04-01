package org.codice.ddf.admin.security.wcpm.commons;

import org.codice.ddf.admin.api.action.Message;
import org.codice.ddf.admin.common.message.ErrorMessage;

public class ContextPolicyMessageCodes {
    public static final Message NO_ROOT_CONTEXT_ERROR = new ErrorMessage("NO_ROOT_CONTEXT");
    public static final Message PERSIST_ERROR = new ErrorMessage("FAILED_PERSIST");
}
