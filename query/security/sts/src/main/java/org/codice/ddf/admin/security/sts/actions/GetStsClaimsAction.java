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
package org.codice.ddf.admin.security.sts.actions;

import static org.codice.ddf.admin.security.common.fields.wcpm.services.PolicyManagerServiceProperties.STS_CLAIMS_CONFIGURATION_CONFIG_ID;
import static org.codice.ddf.admin.security.common.fields.wcpm.services.PolicyManagerServiceProperties.STS_CLAIMS_PROPS_KEY_CLAIMS;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.codice.ddf.admin.common.actions.GetAction;
import org.codice.ddf.admin.common.fields.base.ListFieldImpl;
import org.codice.ddf.admin.configurator.Configurator;
import org.codice.ddf.admin.security.common.fields.sts.StsClaimField;

public class GetStsClaimsAction extends GetAction<ListFieldImpl<StsClaimField>> {

    public static final String NAME = "claims";

    public static final String DESCRIPTION = "All currently configured claims the STS supports.";

    Configurator configurator;

    public GetStsClaimsAction(Configurator configurator) {
        super(NAME, DESCRIPTION, new ListFieldImpl<>(StsClaimField.class));
        this.configurator = configurator;
    }

    @Override
    public ListFieldImpl<StsClaimField> performAction() {
        ListFieldImpl<StsClaimField> claims = new ListFieldImpl<>(StsClaimField.class);
        claims.setValue(getClaims());
        return claims;
    }

    private List<String> getClaims() {
        Map<String, Object> stsConfig = configurator.getConfig(STS_CLAIMS_CONFIGURATION_CONFIG_ID);
        return (stsConfig != null && stsConfig.get(STS_CLAIMS_PROPS_KEY_CLAIMS) instanceof List) ?
                (List) stsConfig.get(STS_CLAIMS_PROPS_KEY_CLAIMS) :
                new ArrayList<>();
    }
}
