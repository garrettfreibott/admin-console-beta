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
package org.codice.ddf.admin.query.commons.fields.base;

import static org.codice.ddf.admin.query.api.fields.Field.FieldBaseType.ENUM;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.codice.ddf.admin.query.api.action.Message;
import org.codice.ddf.admin.query.api.fields.EnumField;
import org.codice.ddf.admin.query.api.fields.Field;

public abstract class BaseEnumField<S> extends BaseField<S> implements EnumField<S, Field<S>> {

    private Field<S> enumValue;
    private List<Field<S>> enumValues;

    public BaseEnumField(String fieldName, String fieldTypeName, String description, List<Field<S>> enumValues) {
        super(fieldName, fieldTypeName, description, ENUM);
        this.enumValues = enumValues;
    }

    public BaseEnumField(String fieldName, String fieldTypeName, String description, List<Field<S>> enumValues, Field<S> enumValue) {
        this(fieldName, fieldTypeName, description, enumValues);
        this.enumValue = enumValue;
    }

    @Override
    public List<Field<S>> getEnumValues() {
        return enumValues;
    }

    @Override
    public S getValue() {
        return enumValue == null? null : enumValue.getValue();
    }

    @Override
    public void setValue(S value) {
        if(value == null) {
            return;
        }

        Optional<Field<S>> matchedEnum = getEnumValues().stream()
                .filter(supportedEnum -> supportedEnum.getValue().equals(value))
                .findFirst();

        if(matchedEnum.isPresent()) {
            enumValue = matchedEnum.get();
        } else {
            // TODO: tbatie - 3/15/17 - Add logger and throw exception or something here
        }
    }

    @Override
    public List<Message> validate() {
        // TODO: tbatie - 3/16/17 - Validate enum types
        return new ArrayList<>();
    }
}
