package org.codice.ddf.admin.security.wcpm.commons;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.codice.ddf.admin.common.fields.common.ContextPaths;
import org.codice.ddf.admin.security.common.fields.wcpm.ContextPolicies;
import org.codice.ddf.admin.security.common.fields.wcpm.ContextPolicyBin;

import com.google.common.collect.ImmutableMap;

public class ContextPolicyServiceProperties {
    // --- Policy manager props
    public static final String POLICY_MANAGER_PID =
            "org.codice.ddf.security.policy.context.impl.PolicyManager";

    public static final String AUTH_TYPES = "authenticationTypes";

    public static final String REALMS = "realms";

    public static final String REQUIRED_ATTRIBUTES = "requiredAttributes";

    public static final String WHITE_LIST_CONTEXT = "whiteListContexts";

    public static final String ROOT_CONTEXT_PATH = "/";
    // ---

    public static Map<String, Object> contextPoliciesToPolicyManagerProps(
            ContextPolicies contextPolicies) {
        List<String> realmsProps = new ArrayList<>();
        List<String> authTypesProps = new ArrayList<>();
        List<String> reqAttrisProps = new ArrayList<>();

        for (ContextPolicyBin bin : contextPolicies.getList()) {
            bin.contexts()
                    .forEach(context -> {
                        realmsProps.add(context + "=" + bin.realm());
                        authTypesProps.add(context + "=" + String.join("|", bin.authTypes()));
                        if (bin.claimsMapping()
                                .isEmpty()) {
                            reqAttrisProps.add(context + "=");
                        } else {
                            reqAttrisProps.add(context + "={" + String.join(";",
                                    bin.claimsMapping()
                                            .entrySet()
                                            .stream()
                                            .map(entry -> entry.getKey() + "=" + entry.getValue())
                                            .collect(Collectors.toList())) + "}");
                        }
                    });
        }

        return ImmutableMap.of(AUTH_TYPES,
                authTypesProps,
                REALMS,
                realmsProps,
                REQUIRED_ATTRIBUTES,
                reqAttrisProps);
    }

    public static Map<String, Object> whiteListToPolicyManagerProps(ContextPaths contexts){
        return ImmutableMap.of(WHITE_LIST_CONTEXT,
                contexts.getValue());
    }
}
