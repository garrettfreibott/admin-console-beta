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
package org.codice.ddf.admin.query.ldap.actions.persist;

import java.util.List;

import org.codice.ddf.admin.query.api.fields.Field;
import org.codice.ddf.admin.query.commons.actions.BaseAction;
import org.codice.ddf.admin.query.ldap.fields.LdapConfigurationField;

import com.google.common.collect.ImmutableList;

public class SaveLdapConfiguration extends BaseAction<LdapConfigurationField> {

    public static final String NAME = "saveLdap";
    public static final String DESCRIPTION = "Saves the LDAP configuration.";
    private LdapConfigurationField config;

    public SaveLdapConfiguration() {
        super(NAME, DESCRIPTION, new LdapConfigurationField());
        config = new LdapConfigurationField();
    }

    // TODO: tbatie - 3/15/17 - Return back all the ldap configurations instead of a Report
    @Override
    public LdapConfigurationField process() {
        return config;
    }

    @Override
    public List<Field> getArguments() {
        return ImmutableList.of(config);
    }
}
