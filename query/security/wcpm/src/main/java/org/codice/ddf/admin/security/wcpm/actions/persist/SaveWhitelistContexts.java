/**
 * Copyright (c) Codice Foundation
 * <p>
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 * <p>
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 **/
package org.codice.ddf.admin.security.wcpm.actions.persist;

import static org.codice.ddf.admin.common.message.DefaultMessages.failedPersistError;
import static org.codice.ddf.admin.security.wcpm.commons.ContextPolicyServiceProperties.POLICY_MANAGER_PID;
import static org.codice.ddf.admin.security.wcpm.commons.ContextPolicyServiceProperties.whiteListToPolicyManagerProps;

import java.util.List;

import org.codice.ddf.admin.api.fields.Field;
import org.codice.ddf.admin.api.fields.ListField;
import org.codice.ddf.admin.common.actions.BaseAction;
import org.codice.ddf.admin.common.fields.base.ListFieldImpl;
import org.codice.ddf.admin.common.fields.common.ContextPath;
import org.codice.ddf.admin.configurator.Configurator;
import org.codice.ddf.admin.configurator.OperationReport;
import org.codice.ddf.security.policy.context.ContextPolicyManager;
import org.codice.ddf.security.policy.context.impl.PolicyManager;

import com.google.common.collect.ImmutableList;

public class SaveWhitelistContexts extends BaseAction<ListField<ContextPath>> {

    public static final String ACTION_ID = "saveWhitelistContexts";

    public static final String DESCRIPTION =
            "Persists the given contexts paths as white listed contexts. White listing a context path will result in no security being applied to the given paths.";

    private ListField<ContextPath> contexts;

    private Configurator configurator;

    public SaveWhitelistContexts(Configurator configurator) {
        super(ACTION_ID, DESCRIPTION, new ListFieldImpl<>(ContextPath.class));
        contexts = new ListFieldImpl<>("paths", ContextPath.class);
        this.configurator = configurator;
    }

    @Override
    public List<Field> getArguments() {
        return ImmutableList.of(contexts);
    }

    @Override
    public ListField<ContextPath> performAction() {
        ContextPolicyManager ref = configurator.getServiceReference(ContextPolicyManager.class);
        PolicyManager policyManager = ((PolicyManager) ref);
        ListField<ContextPath> preUpdateWhitelistContexts = new ListFieldImpl<>(ContextPath.class);

        for (String path : policyManager.getWhiteListContexts()) {
            preUpdateWhitelistContexts.add(new ContextPath(path));
        }

        configurator.updateConfigFile(POLICY_MANAGER_PID,
                whiteListToPolicyManagerProps(contexts),
                true);

        OperationReport configReport = configurator.commit(
                "Whitelist Contexts saved with details: {}",
                contexts.toString());

        if (configReport.containsFailedResults()) {
            addArgumentMessage(failedPersistError(name()));
            return preUpdateWhitelistContexts;
        } else {
            return contexts;
        }
    }
}
