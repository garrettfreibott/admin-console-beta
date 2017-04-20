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
package org.codice.ddf.admin.security.wcpm.actions.discover;

import static org.codice.ddf.admin.security.common.fields.wcpm.services.PolicyManagerServiceProperties.IDP_SERVER_BUNDLE_NAME;

import org.codice.ddf.admin.api.fields.ListField;
import org.codice.ddf.admin.common.actions.GetAction;
import org.codice.ddf.admin.common.fields.base.ListFieldImpl;
import org.codice.ddf.admin.configurator.ConfiguratorFactory;
import org.codice.ddf.admin.security.common.fields.wcpm.Realm;

public class GetRealms extends GetAction<ListField<Realm>> {

    public static final String FIELD_NAME = "realms";

    public static final String DESCRIPTION = "Retrieves all currently configured realms.";

    // TODO: 4/19/17 move these somewhere more common
    public static final String KARAF = "karaf";
    public static final String IDP_REALM = "IdP";
    public static final String LDAP = "ldap";
    public static final String AUTHENTICATION = "authentication";
    public static final String AUTHENTICATION_AND_ATTRIBUTE_STORE =
            "authenticationAndAttributeStore";

    ConfiguratorFactory configuratorFactory;

    public GetRealms() {
        super(FIELD_NAME, DESCRIPTION, new ListFieldImpl<>(Realm.class));
    }

    public GetRealms(ConfiguratorFactory configuratorFactory) {
        this();
        this.configuratorFactory = configuratorFactory;
    }

    @Override
    public ListField<Realm> performAction() {
        ListField<Realm> realms = new ListFieldImpl<>(Realm.class);
        realms.add(Realm.KARAF_REALM);

        if (configuratorFactory.getConfigReader()
                .isBundleStarted(IDP_SERVER_BUNDLE_NAME)) {
            // TODO: 4/19/17 How are we going to treat/display IdP as an auth type
        }

//        ListField<LdapConfigurationField> ldapConfigs = ldapServiceCommons.getLdapConfigurations(
//                configuratorFactory);
//
//        if (ldapConfigs.getList().stream()
//                .anyMatch(config -> config.settingsField().useCase()
//                        .equals(AUTHENTICATION) || config.settingsField().useCase()
//                        .equals(AUTHENTICATION_AND_ATTRIBUTE_STORE))) {
//            realms.add(Realm.LDAP_REALM);
//        }

        return realms;
    }
}
